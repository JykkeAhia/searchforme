
import logging
from django.apps import apps
from django.db.models import Case, When, BooleanField
from django.http import JsonResponse
from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from search import serializers as our_serializers
from search import searches
from search import models

from rest_framework.decorators import api_view

logger = logging.getLogger(__name__)

# https://github.com/HackSoftware/Django-Styleguide#class-based-vs-function-based

# bitcoin tms. search jotta saadaan vaikka minuutin välein päivittyvä data


class SearchCarPriceView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchCarPriceSerializer
    queryset = models.SearchCarPrice.objects.all()


class SearchWebShopView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchWebShopSerializer
    queryset = models.SearchWebShop.objects.all()


class SearchEventView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchEventSerializer
    queryset = models.SearchEvent.objects.all()
    '''
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        # Create a JSON response with all SearchEvents
        response_data = {
            "results": self.serializer_class(queryset, many=True).data,
        }
        return JsonResponse(response_data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # Create a JSON response with only the requested SearchEvent
        response_data = {
            "id": instance.id,
            "data": self.serializer_class(instance).data,
        }
        return JsonResponse(response_data)
    '''


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

    for search_type, search_script_name in searches.usable_search_functions.items():
        logger.info(search_type)
        logger.info(search_script_name.__name__)

        search_model = search_script_name.__name__.replace("Script", "")
        searches_tmp = get_objects_by_model(search_model)
        logger.info(searches_tmp)

        dict_tmp = {
            "script_function": search_script_name.__name__,
            "saved_searches": searches_tmp.values(),
        }
        logger.info(dict_tmp)

        dict_to_send[search_type] = dict_tmp

    return Response(dict_to_send, status=status.HTTP_200_OK)


# lets get dynamically some models from the database note app_label means the app that is set in settings
def get_objects_by_model(model_name):
    ''' We need to get the search Models like this since we don't know what scripts there are '''
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
    ''' Uusia hakuja voidaan luoda mutta niitä ei koskaan päivitetä, koska tarkoitus on kerätä hakujen datan muutoksia'''
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
# @renderer_classes((JSONRenderer))
def runSearch(request):
    ''' Will run all kinda Searches that depending on the SearchScript will write data to Events in a JSON field as key value pairs
        or if chosen to java event sourcing service
    '''
    if 'search_id' not in request.GET:
        return Response("search_id not provided", status=status.HTTP_400_BAD_REQUEST)

    # TODO add search type (single time or multiple times -> leads to event sourcing results)
    # TODO if 'search_type' not in request.GET:
    #   return Response("search_type not provided", status=status.HTTP_400_BAD_REQUEST)
    # Also add time interval for search celery task time settings

    # TODO try catch
    # This way we can search base class since we don't know what subclasses we have in the end
    search = models.Search.objects.get_subclass(id=request.GET['search_id'])
    # Then we will call the Script that will search and save results
    search_event = searches.usable_search_functions[search.script](search)

    return Response(search_event, status=status.HTTP_201_CREATED)
