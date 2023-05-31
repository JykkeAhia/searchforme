from django.contrib import admin
from search import models


class SearchCarPriceAdmin(admin.ModelAdmin):
    list_display = (
        'create_datetime',
        'title',
        'script',
        # 'has_searchevent',
        'parameter_model',
        'parameter_make',
    )
# TODO add has_searchevent boolean somehow


class SearchWebShopAdmin(admin.ModelAdmin):
    list_display = (
        'create_datetime',
        'title',
        'script',
        # 'has_searchevent',
        'search_string',
        'search_max_price',
    )


class SearchEventAdmin(admin.ModelAdmin):
    list_display = (
        'search',
        'created_datetime',
        'event_type',
        'display_data',
    )

    def search_display(self, obj):
        return str(obj.search)
    search_display.short_description = 'Search'

    # display jsonfield data in admin interface
    def display_data(self, obj):
        if obj.data:
            return obj.data  # TODO how to display nicely
        return None
    display_data.short_description = 'Data'


admin.site.register(models.SearchEvent, SearchEventAdmin)
admin.site.register(models.SearchWebShop, SearchWebShopAdmin)
admin.site.register(models.SearchCarPrice, SearchCarPriceAdmin)
