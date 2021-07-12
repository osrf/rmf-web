#!/bin/bash
set -e;

export REPORTING_SERVER_CONFIG=reporting_server_config.py
export PIPENV_PIPFILE=../../Pipfile

pipenv run reporting_server
