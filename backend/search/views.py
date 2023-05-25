from search import models
from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from search import serializers as our_serializers
from search import searches

from rest_framework.decorators import api_view

# https://github.com/HackSoftware/Django-Styleguide#class-based-vs-function-based

# TODO add history of events on certain search type 

# YES how to get api endpoint parameters information to for react etc frontend
# http://127.0.0.1:8000/api/searchcarprice/?format=json
'''
{"name":"Search Car Price List","description":"","renders":["application/json","text/html"],"parses":["application/json","application/x-www-form-urlencoded","multipart/form-data"],"actions":{"POST":{"id":{"type":"integer","required":false,"read_only":true,"label":"ID"},"title":{"type":"string","required":true,"read_only":false,"label":"Title","max_length":120},"create_datetime":{"type":"datetime","required":false,"read_only":true,"label":"Create datetime"},"script":{"type":"string","required":true,"read_only":false,"label":"Script","max_length":24},"parameter_model":{"type":"string","required":true,"read_only":false,"label":"Parameter model","max_length":256},"parameter_make":{"type":"string","required":true,"read_only":false,"label":"Parameter make","max_length":256}}}}
'''

# TODO pitää voida kysyä mitä searchejä on olemassa 
# bitcoin tms. search jotta saadaan vaikka minuutin välein päivittyvä data

class SearchCarPriceView(viewsets.ModelViewSet):
    serializer_class = our_serializers.SearchCarPriceSerializer
    queryset = models.SearchCarPrice.objects.all()


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

            # TODO run search vai ajo erikseen joo
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
# @renderer_classes((JSONRenderer))
def runSearch(request):
    ''' Will run all kinda Searches and depending on the Search will write data to Events in a JSON field as key value pairs'''
    if 'search_id' not in request.GET:
        return Response("search_id not provided", status=status.HTTP_400_BAD_REQUEST)

    # TODO try catch
    search = models.Search.objects.get(id=request.GET['search_id'])

    # kutsutaan oikea Search scripti ja annetaan sille Search
    # (se osaa ottaa sieltä alaluokan ja yläluokan parametrit)
    search_event = searches.usable_search_functions[search.script](search)
    # TODO search_event serialization
    # celery delay todo em.
    return Response(search_event, status=status.HTTP_201_CREATED)
