from rest_framework import serializers
from search import models


class SearchCarPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SearchCarPrice
        fields = (
            'id',
            'title',
            'create_datetime',
            'script',
            'parameter_model',
            'parameter_make',
        )
