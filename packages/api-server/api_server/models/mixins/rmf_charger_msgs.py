########################################################
#                                                      #
# this file is generated by ros_tortoise, do not edit! #
#                                                      #
########################################################

from tortoise import fields
from ._ros_time import RosTimeField


class ChargerCancelMixin():
    charger_name = fields.TextField()
    request_id = fields.TextField()

class ChargerRequestMixin():
    charger_name = fields.TextField()
    fleet_name = fields.TextField()
    robot_name = fields.TextField()
    start_timeout = fields.JSONField()
    request_id = fields.TextField()

class ChargerStateMixin():
    charger_time = RosTimeField()
    state = fields.IntField()
    charger_name = fields.TextField()
    error_message = fields.TextField()
    request_id = fields.TextField()
    robot_fleet = fields.TextField()
    robot_name = fields.TextField()
    time_to_fully_charged = fields.JSONField()

