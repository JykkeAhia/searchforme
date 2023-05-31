from rest_framework import serializers
from search import models

# TODO make a dynamic field or foreign key field for has_searchevent


class SearchCarPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SearchCarPrice
        fields = (
            'id',
            'title',
            'create_datetime',
            'script',
            # 'has_searchevent',
            'parameter_model',
            'parameter_make',
        )


class SearchWebShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SearchWebShop
        fields = (
            'id',
            'title',
            'create_datetime',
            'script',
            # 'has_searchevent',
            'search_string',
            'search_max_price',
        )
