import logging
import json
from django.conf import settings
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from search import models

logger = logging.getLogger(__name__)

# TODO how to get chromodriver that is the same as in the docker base image
# run container and login to get info
# 1. get the chromeversion 
# 2. download and install 
# 3. download and install chromewebdriver for that version of chrome 


def ota_webdriver():
    # https://stackoverflow.com/questions/56436173/python-selenium-chromedriver-not-working-with-headless-option
    user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2'
    options = Options()
    options.headless = True
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--no-sandbox")
    options.add_argument("--incognito")
    options.add_argument(f'user-agent={user_agent}')

    return webdriver.Chrome(settings.SELENIUM_CHROMEDRIVER_LOCATION, options=options)

    # TODO how to load jsondata
    '''instance = MyModel.objects.get(pk=1)  # Assuming you have an instance with a primary key of 1
    json_data = instance.json_data
    data = json.loads(json_data)
    '''


def SearchCarPriceScript(search: models.SearchCarPrice):
    ''' Search for a car price in nettiauto.com '''
    driver = ota_webdriver()

    logger.info(search)
    logger.info(driver)

    baseUrl = "https://www.nettiauto.com/{make}/{model}?id_vehicle_type=1&id_car_type=4&id_fuel_type=8&id_country[]=73&chargingPowerFrom=&chargingPowerTo="

    searchUrl = baseUrl.format(make=search.parameter_make, model=search.parameter_model)
    try:
        driver.get(searchUrl)
    except Exception as e:
        logger.info(F"Eka sivun baseUrl = {searchUrl} lautaus kusi exception : {e}")
        driver.close()
        driver.quit()
        raise e

    logger.info(F'Running baseUrl: {searchUrl} : found: {driver.find_element(By.CLASS_NAME, "ma0").text}')

    element = driver.find_element(By.CLASS_NAME, "ma0")
    json_data = element.get_attribute("textContent")

    json_data = json_data.replace('Vaihtoautohaun tulokset: ', '').replace(' vaihtoautoa.', '')
    json_data = {
        "Vaihtoautojen määrä": json_data
    }

    try:
        parsed_data = json.dumps(json_data)
    except json.JSONDecodeError:
        # TODO let's not save this -> error message to UI
        parsed_data = {"error": "Invalid JSON"}

    # For now let's save the amount of these type of cars that are found
    search_event = models.SearchEvent(
        search=search,
        event_type="One time testing",
        data=parsed_data,
    )
    logger.info(search_event)
    search_event.save()

    driver.close()
    driver.quit()

    # TODO tee java sydemi vaiheessa 2
    # https://www.baeldung.com/cqrs-event-sourcing-java
    # https://medium.com/bb-tutorials-and-thoughts/how-to-dockerize-java-rest-api-3d55ad36b914

    event = "All was well but well was not all. Searchcarprice was a success."
    return event


def SearchWebShopScript(search: models.SearchWebShop) -> str:
    ''' Search for product price from verkkokauppa.com '''
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

    event = "webshopsearch parameters tulos"

    return event


# the key should match the script in the Search object
# TODO these must be sent to front end as key value pair json
usable_search_functions = {
    'searchcarprice': SearchCarPriceScript,
    'searchwebshop': SearchWebShopScript,
}
