import logging
from celery import shared_task
from search.models import Search
from search import searches

# TODO add celery logging support since multiple processes can be running
logger = logging.getLogger(__name__)


@shared_task
def daily_search(search_id: int):
    search = Search.objects.get_subclass(id=search_id)
    search_event = searches.usable_search_functions[search.script](search)
    logger.info(F"Running daily search - search.id : {search.id} event : {search_event}")


@shared_task
def hourly_search(search_id: int):
    logger.info(F"=======>Running hourly search - search.id : {search_id}")
    search = Search.objects.get_subclass(id=search_id)
    search_event = searches.usable_search_functions[search.script](search)
    logger.info(F"Running hourly search - search.id : {search.id} event : {search_event}")
