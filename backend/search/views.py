from django.shortcuts import render
from search import models
from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from search import serializers as our_serializers
from django.views.decorators.http import require_GET
from search import searches

from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer


class SearchCarPriceView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchCarPriceSerializer
    queryset = models.SearchCarPrice.objects.all()


class CreateSearchCarPriceApi(APIView):
    ''' Uusia hakuja voidaan luoda mutta niitä ei koskaan päivitetä, 
    koska tarkoitus on kerätä hakujen datan muutoksia'''
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

            # TODO run search vai ajo erikseen joo
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
def runSearch(request):
    ''' Will run all kinda Searches and depending on the Search will
    write data to Event Source DB in a JSON field'''
    if 'search_id' not in request.GET:
        return Response("Search id not provided", status=status.HTTP_400_BAD_REQUEST)

    # TODO try catch
    search = models.Search.objects.get(id=request.GET['search_id'])

    # kutsutaan oikea Search scripti ja annetaan sille Search
    # (se osaa ottaa sieltä alaluokan ja yläluokan parametrit)
    search_event = searches.usable_search_functions[search.script](search)
    # TODO search_event serialization
    # celery delay todo em.
    return Response(search_event, status=status.HTTP_201_CREATED)
