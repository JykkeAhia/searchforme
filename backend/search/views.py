
import logging
import json
from django.http import JsonResponse
from django.apps import apps
from django.db.models import Case, When, BooleanField
# from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from search import serializers as our_serializers
from search import searches
from search import models

logger = logging.getLogger(__name__)

# TODO add celery for continuous searches to generate event sourcing data
# TODO tee java sydemi vaiheessa 2
# https://www.baeldung.com/cqrs-event-sourcing-java
# https://medium.com/bb-tutorials-and-thoughts/how-to-dockerize-java-rest-api-3d55ad36b914
# TODO add decorator for timing searches


class SearchCarPriceView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchCarPriceSerializer
    queryset = models.SearchCarPrice.objects.all()


class SearchWebShopView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchWebShopSerializer
    queryset = models.SearchWebShop.objects.all()


class SearchEventView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchEventSerializer
    queryset = models.SearchEvent.objects.all()


@api_view(['GET'])
def searchOptions(request):
    ''' FIXME and use internationalization or take Title from script '''
    my_dict = {
        'searchcarprice': 'Search for car price',
        'searchwebshop': 'Search web shop',
    }
    return Response(my_dict, status=status.HTTP_200_OK)


@api_view(['GET'])
def allSavedSearches(request):
    ''' Get all created searches for UI '''
    dict_to_send = {}

    for search_name, search_script_name in searches.usable_search_functions.items():
        logger.info(search_script_name.__name__.replace("Script", ""))
        search_model = search_script_name.__name__.replace("Script", "")
        searches_tmp = get_objects_by_model(search_model)

        logger.info(searches_tmp)
        logger.info(searches_tmp.count())
        dict_tmp = {
            "script_function": search_script_name.__name__,
            "saved_searches": searches_tmp.values(),
        }
        dict_to_send[search_name] = dict_tmp

    return Response(dict_to_send, status=status.HTTP_200_OK)


def get_objects_by_model(model_name):
    ''' We need to get the search Models like this since we don't know what scripts there are also we annotate with has_searchevent '''
    logger.info(model_name)
    Model = apps.get_model(app_label='search', model_name=model_name)
    if Model:
        return Model.objects.annotate(has_searchevent=Case(
            When(searchevent__isnull=False, then=True),
            default=False,
            output_field=BooleanField()
        ))
    return None


# NICE to have ota tälläinen oma käyttöön jossain esimerkin vuoksi
class CreateSearchCarPriceApi(APIView):
    ''' Uusia hakuja voidaan luoda mutta niitä ei koskaan päivitetä, koska tarkoitus on kerätä hakujen datan muutoksia '''
    class InputSerializer(serializers.Serializer):
        title = serializers.CharField()
        script = serializers.CharField()
        parameter_model = serializers.CharField()
        parameter_make = serializers.IntegerField()

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        if serializer.is_valid(raise_execution=True):
            search = models.SearchCarPrice(**serializer.validated_data)
            search.full_clean()
            search.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
def getSearchById(request, id: int):
    ''' Get Search subclass by Search id and dynamically create a response json data to UI '''
    # TODO error handling
    search = models.Search.objects.get_subclass(id=id)
    # Create the data dictionary dynamically based on search_fields
    search_fields = [field.name for field in search._meta.get_fields() if field.concrete]
    data = {field: getattr(search, field) for field in search_fields}
    # hax this so no json error
    data['search_ptr'] = str(data['search_ptr'])

    return JsonResponse(data, safe=False)


@api_view(('GET',))
# @renderer_classes((JSONRenderer))
def runSearch(request):
    ''' Will run all kinda Searches and depending on the SearchScript will write data to SeachEvents in a JSON field as key value pairs
        or if chosen to java event sourcing service LATER
    '''
    if 'search_id' not in request.GET:
        return Response("search_id not provided", status=status.HTTP_400_BAD_REQUEST)

    # TODO add search type (single time or multiple times -> leads to event sourcing results)
    # TODO if 'search_type' not in request.GET:
    #   return Response("search_type not provided", status=status.HTTP_400_BAD_REQUEST)
    # Also add time interval for search celery task time settings

    # TODO try catch and response error to UI
    # This way we can search base class since we don't know what subclasses we have in the end
    search = models.Search.objects.get_subclass(id=request.GET['search_id'])
    # Then we will call the Script that will search and save results
    search_event = searches.usable_search_functions[search.script](search)

    return Response(search_event, status=status.HTTP_201_CREATED)


@api_view(('GET',))
def getResultsForSearch(request):
    ''' Get all results for a search_id '''
    if 'search_id' not in request.GET:
        return Response("search_id not provided", status=status.HTTP_400_BAD_REQUEST)

    search_events = models.SearchEvent.objects.filter(search_id=request.GET.get('search_id'))

    result = []
    for search_event in search_events:
        dict_to_send = {
            'search_event_id': search_event.id,
            'search': str(search_event.search),
            'created_datetime': search_event.created_datetime,
            'event_type': search_event.event_type,
            'data': json.loads(search_event.data),  # Search result data is strored in a jsonfield
        }
        result.append(dict_to_send)
    logger.info(result)
    return JsonResponse(result, safe=False)
