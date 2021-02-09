########################################################
#                                                      #
# this file is generated by ros_tortoise, do not edit! #
#                                                      #
########################################################

from tortoise import fields


class IngestorRequestMixin:
    time = fields.DatetimeField()
    request_guid = fields.TextField()
    target_guid = fields.TextField()
    transporter_type = fields.TextField()
    items = fields.JSONField()


class IngestorRequestItemMixin:
    type_guid = fields.TextField()
    quantity = fields.IntField()
    compartment_name = fields.TextField()


class IngestorResultMixin:
    time = fields.DatetimeField()
    request_guid = fields.TextField()
    source_guid = fields.TextField()
    status = fields.SmallIntField()


class IngestorStateMixin:
    time = fields.DatetimeField()
    guid = fields.TextField()
    mode = fields.IntField()
    request_guid_queue = fields.JSONField()
    seconds_remaining = fields.FloatField()