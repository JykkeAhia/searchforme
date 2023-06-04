FROM joyzoursky/python-chromedriver:3.8-selenium

RUN apt -y update 
# RUN apt -y upgrade && apt install python3-dev gcc libc-dev -y

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV DEBUG_LOG_LOCATION=./debug.log
ENV ERROR_LOG_LOCATION=./error.log
ENV SELENIUM_CHROMEDRIVER_LOCATION='/usr/local/bin/chromedriver'

ADD . /usr/src/app
COPY . .

RUN pip install --upgrade pip
# RUN pip install --upgrade -r ./requirements/base.txt
RUN apt install nano
# TODO aseta static files asetuksiin RUN python manage.py collectstatic --noinput
# RUN python manage.py makemigrations --noinput
# RUN python manage.py migrate

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD pip install --upgrade -r ./requirements/base.txt && python manage.py makemigrations --noinput && python manage.py migrate && python manage.py runserver 0.0.0.0:8000