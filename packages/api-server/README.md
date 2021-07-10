# Setup

Install pipenv and lerna

```bash
pip3 install pipenv
npm install -g lerna@4
```

If not already done so, [bootstrap](../../README.md#bootstrap) the project, you can use
```bash
lerna bootstrap --scope=api-server
```
to bootstrap only this package.

# Run the server

```bash
rmf_api_server
```

## Configuration

Config files are python modules that export a variable named `config`. See [default_config.py](api_server/default_config.py) for an example and list of the options available. All options are REQUIRED unless specified otherwise.

Configuration is read from the file specified in the env `RMF_API_SERVER_CONFIG`, if not provided, the default config is used.

e.g.
```bash
RMF_API_SERVER_CONFIG='my_config.py' rmf_api_server
```

## Supported databases

rmf-server uses [tortoise-orm](https://github.com/tortoise/tortoise-orm/) to perform database operations. Currently, the supported databases are

* PostgreSQL
* SQLite
* MySQL
* MariaDB

by default it uses a in-memory sqlite instance, to use other databases, install rmf-server with the relevalent extras

* PostgreSQL - postgres
* MySQL - mysql
* MariaDB - maria

.e.g.

```bash
pip3 install rmf-server[postgres]
```

Then in your config, set the `db_url` accordingly, the url should be in the form

```
DB_TYPE://USERNAME:PASSWORD@HOST:PORT/DB_NAME?PARAM1=value&PARAM2=value
```

for example, to connect to postgres

```
postgres://<user>:<password>@<host>/<database>
```

for more information, see https://tortoise-orm.readthedocs.io/en/latest/databases.html.

## Running behind a proxy

When running behind a reverse proxy like nginx, you need to set the `public_url` option to the url where rmf-server is served on. The reverse proxy also MUST strip the prefix.

For example, if rmf-server is served on https://example.com/rmf/api/v1, `public_url` must be set to `https://example.com/rmf/api/v1` and your reverse proxy must be configured to strip the prefix such that it forwards requests from `/rmf/api/v1/something` to `/something`.

## Running with RMF simulations

When running with rmf simulations, you need to set the env `RMF_SERVER_USE_SIM_TIME=true`. This is needed to ensure that times from the client are correctly converted to RMF's simulation time.

# Authentication and Authorization

## OpenID Connect

rmf-server does not manage user identities and access levels by itself, it uses an OpenID Connect compatibily authentication server. Therefore, in order to management an user's access level and roles, you should change it from the authentication server, there are no endpoints for account management in rmf-server for now. If using keycloak as the authentication server, see https://www.keycloak.org/docs/latest/server_admin/index.html#roles for detailed documentation.

## Access Token Requirements

### Format

OpenID Connect does not define the format of the access token, the canonical way for a resource server to validate an access token is to use the token introspection endpoint of the authentication server. In order to not have to connect to the authentication server for every request, rmf-server assumes the convention that the access token is a JWT that can be verified independently. Most modern authentication server and services like keycloak and auth0 follows this convention.

### Claims

OpenID Connect does not specify a conventional way to obtain an user's access levels or roles. It does however allows arbitrary claims to be defined for an user, to that end, rmf-server makes use of the `resource_access` claim defined by default in keycloak to obtain an user's roles. The claim should be in the form

```json
"resource_access": {
  "${cliend_id}": {
    "roles": [
      ...
    ]
  }
}
```

where `client_id` refers to the client id created in keycloak. This claim should be attached to the access token. If using other authentication servers, you need to config it such that it returns the same claim.

## Roles and Groups

While authentication and managing user access is done in the authentication server, authorization is done in-app by rmf-server. With the correct access token, rmf-server can securely find out about an user's roles, below are the list of builtin roles that rmf-server understands:

| Role | Description |
| - | - |
| _rmf_task_submit | Submit task |
| _rmf_task_cancel | Cancel an existing task |
| _rmf_task_admin | Able to manage tasks created by anyone |
| _rmf_superadmin | Superset of all roles |

On top of the builtin roles, user's can be assigned to any roles that begins with `rmf_`, these roles will be considered as "groups" by rmf-server. rmf-server will attach these groups to any resources they create, any users with any of the groups will have read access to these resources. Each resource also has an owner, the owner will always have full control over the resource.

For example, given an user alice, which has the roles `["rmf_kitchen", "_rmf_task_submit"]` and bob which has the roles `["rmf_kitchen"]`. Alice will be able to submit a new task, since alice is the owner of the task, she will be able to cancel it even though she doesn't have the `_rmf_task_cancel` role. Bob on the other hand will not be able to cancel the task unless he has the `_rmf_task_cancel` role. Bob also cannot submit new tasks because he does not have the `_rmf_task_submit` role, however, he will be able to see the tasks created by alice because he has the same `rmf_kitchen` role as alice.

Assume a third user, charlie who has the roles `["_rmf_task_cancel", "rmf_bedroom"]`, he will not be able to see or cancel the task created by alice because he doesn't have the `rmf_kitchen` role. However, if alice also has the `rmf_bedroom` role, then charlie will be able to see and cancel the task. Similarly, if charlie has the roles `["_rmf_task_admin"]`, he will be able to see the task created by alice, but will not be able to cancel it unless he also has `_rmf_task_cancel`.

## Difference between role and group

Both roles and groups are represented by the same JWT claims, the differentiation between them is mostly semantic to make the system more intuitive. A rmf-server role is a jwt role starting with `_rmf_` and a group is a jwt role starting with `rmf_`, other jwt roles are ignored by rmf-server. Generally, a role determines if an user is able to perform certain actions like submitting tasks, a group on the other hand determines the visibility and access rights of an user.

# Developers

## About FastIO

FastIO is a wrapper between socket.io and fastapi to automatically unify the endpoints. It adds a new asgi app class `FastIO` which contains both a FastAPI app and socket.io app inside. A new `FastIORouter` is also added that can be used with the new `FastIO` app similar to the default FastAPI router. The main functionality `FastIORouter` adds is a new `watch` method, registering an endpoint with the `watch` method automatically adds both a socket.io endpoint and a rest GET endpoint. The GET endpoint will automatically returns the latest response from the socket.io endpoint.

Here is an example of how the FastIO works

```python
        import rx.subject
        import uvicorn

        from api_server.fast_io import FastIORouter

        class ReturnVideo(pydantic.BaseModel):
            film_title: str

        app = FastIO()
        router = FastIORouter()
        target = rx.subject.Subject()


        @router.watch("/video_rental/{film_title}/available", target)
        def watch_availability(rental: dict):
            return {"film_title": rental["film"]}, rental


        @router.post("/video_rental/return_video")
        def post_return_video(return_video: ReturnVideo):
            target.on_next({"film": return_video.film_title, "available": True})


        app.include_router(router)

        uvicorn.run(app)
```

This registers a socket.io endpoint, a GET endpoint at `/video_rental/{film_title}/available` and a POST endpoint at `/video_rental/return_video`. When a request is received in the POST endpoint, it triggers an event in the target observable, when this happens, FastIO will call the function registered in the watch decorator (`watch_availability` in this case), the function should return a tuple containing a dict mapping the path parameters and the response to send. FastIO uses this to map the event into a socket.io room and automatically sends a message to it, it also remembers the last message sent, requests to the GET endpoint will automatically return the last event sent.

An example flow:
1. Received a POST request at `/video_rental/return_video`, containing body `{"film_title": "inception"}`.
2. Triggers an event in the target observable, containing the returned film title.
3. FastIO calls `watch_availability` to get the path mapping, in this case, the path param `film_title` is mapped to `inception`.
4. FastIO uses the path param mappings to send an event to the room `/video_rental/inception/available`. It also remembers the last event sent to each room.
5. When a GET request is received at `/video_rental/inception/available`, FastIO looks at the last sent event and automatically response with that.

In order to keep the bandwidth down, FastIO will not automatically add a client to any room, the client have to send an event to the `subscribe` room first.

e.g.
```js
sio.emit('subscribe', { path: '/video_rental/inception/available' });
sio.on('/video_rental/inception/available', console.log);
```

## Running tests

### Running unit tests

```bash
npm test
```

### Collecting code coverage

```bash
npm run test:cov
```

Generate coverage report
```bash
npm run test:report
```

## Live reload

```bash
uvicorn --reload api_server.app:app
```
