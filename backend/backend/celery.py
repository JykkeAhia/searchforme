import logging
# import os
from celery import Celery
from django.conf import settings
from celery.schedules import crontab
# from search.views import schedule_daily_tasks, schedule_hourly_tasks

import django
django.setup()

logger = logging.getLogger(__name__)

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

logger.info('Starting celery')

app.config_from_object(settings, namespace='CELERY')

app.autodiscover_tasks()

"""
app.conf.beat_schedule = {
    'run_hourly_task': {
        'task': schedule_hourly_tasks,
        'schedule': crontab(minute='*/10'),  # Run every 10 minutes
    },
}

app.conf.beat_schedule = {
    'run_daily_task': {
        'task': schedule_daily_tasks,
        'schedule': crontab(hour=0, minute=0),  # midnight
    },
}
"""
