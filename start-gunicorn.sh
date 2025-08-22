#!/bin/bash

# Gunicorn configuration for production
export PYTHONPATH=$PYTHONPATH:$(pwd)
exec gunicorn --bind 0.0.0.0:8000 \
    --workers 4 \
    --worker-class sync \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    src.scripts.main:app
