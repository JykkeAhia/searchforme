# TODO import selenium and stuff
from search import models


# TODO luo headless chromedriver
# def get_chromer_driver


def SearchCarPriceScript(search: models.SearchCarPrice):

    # aja haku functio sillä perusteella mikä on search.script
    # parametrit se tietää scriptissä mitä haluaa ja ne saa
    # search oliolta sitten
    # model = search.parameter_model
    # make = search.parameter_make

    # TODO aja haku
    # get chrome driver()
    # selenium jotain
    # kirjoita kantaan niitä eventtejä

    # TODO tee java sydemi vaiheessa 2
    # https://www.baeldung.com/cqrs-event-sourcing-java
    # ja laite se dockerriin
    # https://medium.com/bb-tutorials-and-thoughts/how-to-dockerize-java-rest-api-3d55ad36b914

    event = "var price tosiasiassa tässä palautetaan se eventti F model jne."

    return event


def SearchWebShopScript(search: models.SearchWebShop) -> str:

    # aja haku functio sillä perusteella mikä on search.script
    # parametrit se tietää scriptissä mitä haluaa ja ne saa
    # search oliolta sitten
    # = search.search_string
    # = search.parameter_make

    # TODO aja haku
    # get chrome driver()
    # selenium jotain
    # kirjoita kantaan niitä eventtejä

    # 1. tee haku
    # 2. tallenna SearchEventti kantaan 
    # 3. laita datat jsonfieldiin
    # 4. palauta eventti jossa data siis mukana

    event = "tosiasiassa tässä palautetaan se eventti F parameters tulos"

    return event


# the key should match the script in the Search object
# TODO these must be sent to front end as key value pair json
usable_search_functions = {
    'search_car_price': SearchCarPriceScript,
    'search_web_shop': SearchWebShopScript,
}
