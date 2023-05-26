from django.contrib import admin
from search import models


class SearchCarPriceAdmin(admin.ModelAdmin):
    list_display = (
        'create_datetime',
        'title',
        'script',
        'parameter_model',
        'parameter_make',
    )


class SearchWebShopAdmin(admin.ModelAdmin):
    list_display = (
        'create_datetime',
        'title',
        'script',
        'search_string',
        'search_max_price',
    )


admin.site.register(models.SearchWebShop, SearchWebShopAdmin)
admin.site.register(models.SearchCarPrice, SearchCarPriceAdmin)
