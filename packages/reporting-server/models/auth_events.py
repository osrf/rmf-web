from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class AuthEvents(models.Model):
    id = fields.IntField(pk=True)
    # user = fields.ForeignKey(User, null=True)
    username = fields.CharField(max_length=100, null=True)
    user_keycloak_id = fields.CharField(max_length=100, null=True)
    event_type = fields.CharField(max_length=100)
    realm_id = fields.CharField(max_length=100, null=True)
    client_id = fields.CharField(max_length=100, null=True)
    ip_address = fields.CharField(max_length=50, null=True)
    created = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return str(self.event_type)


AuthEvents_Pydantic = pydantic_model_creator(AuthEvents, name="AuthEvents")
