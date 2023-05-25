from django.contrib import admin
from search import models


class SearchCarPriceAdmin(admin.ModelAdmin):
    list_display = (
        'create_datetime',
        'title',
        'script',
       #'description',
        'parameter_model',
        'parameter_make',
    )


admin.site.register(models.SearchCarPrice, SearchCarPriceAdmin)
