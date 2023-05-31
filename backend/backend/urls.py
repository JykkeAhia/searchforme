"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from search import views

router = routers.DefaultRouter()
router.register(r'searchcarprice', views.SearchCarPriceView, 'search-car-price')
router.register(r'searchwebshop', views.SearchWebShopView, 'search-web-shop')
router.register(r'search', views.SearchEventView, 'search')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/runsearch/', views.runSearch, name='action-run-search'),
    path('api/searches/', views.searchOptions, name='search-options'),
    path('api/allsavedsearches/', views.allSavedSearches, name='all-saved-searches'),
]

# TODO miten frontti tietää mitä hakuja meillä on listattavaksi drop down valikkoon?
# jotenkin sen pitää osata hakea kaikki api/search alla olevat mahdollisuudet options
# ja kysyä mitä dataa tarvitaan sen luomiseen
# ja esittää ne boxit sitten dynaamisesti
