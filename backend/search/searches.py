# TODO import selenium and stuff
from search import models


# TODO luo headless chromedriver
# def get_chromer_driver


def SearchCarPriceScript(search: models.SearchCarPrice):

    # aja haku functio sillä perusteella mikä on search.script
    # parametrit se tietää scriptissä mitä haluaa ja ne saa
    # search oliolta sitten
    model = search.parameter_model
    make = search.parameter_make

    # TODO aja haku
    # get chrome driver()
    # selenium jotain
    # kirjoita kantaan niitä eventtejä

    return search


def SearchWebShopScript(search: models.SearchWebShop) -> str:

    # aja haku functio sillä perusteella mikä on search.script
    # parametrit se tietää scriptissä mitä haluaa ja ne saa
    # search oliolta sitten
    model = search.search_string
    make = search.parameter_make

    # TODO aja haku
    # get chrome driver()
    # selenium jotain
    # kirjoita kantaan niitä eventtejä

    event = "tosiasiassa tässä palautetaan se eventti"

    return event


usable_search_functions = {
    'search_car_price': SearchCarPriceScript,
    'search_web_shop': SearchWebShopScript,
}
