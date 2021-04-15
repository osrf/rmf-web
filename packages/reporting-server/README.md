# Setup

Install pipenv

```bash
pip3 install pipenv
```

If not already done so, [bootstrap](../../README.md#bootstrap) the project, you can use
```bash
npm run bootstrap -- packages/reporting-server
```
to bootstrap only this package.

# Run the server

```bash
rmf_reporting_server
```

## Configuration

Config files are python modules that export a variable named `config`. See [default_config.py](rest_server/default_config.py) for an example and list of the options available. All options are REQUIRED unless specified otherwise.

Configuration is read from the file specified in the env `RMF_REPORT_REST_SERVER_CONFIG`, if not provided, the default config is used.

e.g.
```bash
RMF_REPORT_REST_SERVER_CONFIG='my_config.py' rmf_reporting_server
```

# Developers

## Running tests

### Running unit tests

```bash
npm run test
```

### Running integration tests

```bash
npm run test:integration
```

### Collecting code coverage

```bash
npm run test:cov
```
NOTE: This runs both unit and integration tests.

Generate coverage report
```bash
npm run test:report
```

## Live reload

```bash
uvicorn --reload rest_server.app:app
```