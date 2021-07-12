import json


async def auth_event_parser(fullstring: str):
    splitted_string = fullstring.split("JSON_EVENT::")
    modified_string = splitted_string[1]
    state_json = json.loads(modified_string)

    return {
        "username": state_json.get("username", None),
        "user_keycloak_id": state_json.get("userId", None),
        "event_type": state_json["type"],
        "realm_id": state_json.get("realmId", None),
        "client_id": state_json.get("clientId", None),
        "ip_address": state_json["ipAddress"],
    }
