from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from model_utils.managers import InheritanceManager


class Search(models.Model):
    ''' This should be an abstract class but later '''
    SEARCH_TYPE_CHOICES = [
        ('one_time', _("Option once")),
        ('hourly', _("Option hourly")),
        ('daily', _("Option daily")),
    ]
    title = models.CharField(max_length=120)
    create_datetime = models.DateTimeField(auto_now_add=True)
    script = models.CharField(max_length=24)
    search_type = models.CharField(max_length=50, choices=SEARCH_TYPE_CHOICES)

    # NICE to have description = models.TextField(max_length=255)
    # https://web3usecase.co/improving-your-django-model-design-2b3158ad10df

    objects = InheritanceManager()

    # TODO def clean(self) validate base class search parameter

    def __str__(self):
        return F"Search Title: {self.title}"

    class Meta:
        ordering = ['create_datetime']


class SearchCarPrice(Search):
    parameter_model = models.CharField(max_length=256)
    parameter_make = models.CharField(max_length=256)

    def clean(self):
        # TODO super().clean()
        if len(self.parameter_model) < 1:
            raise ValidationError(_("Car model must be at least 1 char long"))
        if len(self.parameter_make) < 2:
            raise ValidationError(_("Car make must be at least 2 char long"))


class SearchWebShop(Search):
    search_string = models.CharField(max_length=256)
    search_max_price = models.IntegerField()

    # TODO clean(self):


""" class SearchBitcoin(Search):
    api_key = models.CharField(max_length=256)
    search_api_url = models.CharField(max_length=256)
 """


class SearchEvent(models.Model):
    ''' We use jsonfield for search results since we don't know what results new scripts might have '''
    search = models.ForeignKey(Search, on_delete=models.CASCADE)
    created_datetime = models.DateTimeField(auto_now_add=True)
    event_type = models.CharField(max_length=20)
    data = models.JSONField(null=True)

    def __str__(self):
        return F"{self.search}"

    class Meta:
        ordering = ['created_datetime']
