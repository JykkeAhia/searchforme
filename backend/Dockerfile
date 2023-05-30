FROM joyzoursky/python-chromedriver:3.8-selenium

RUN apt -y update 
# RUN apt -y upgrade && apt install python3-dev gcc libc-dev -y

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# ENV CELERY_BROKER_URL=redis://redis:6379/4
# ENV CELERY_RESULT_BACKEND=redis://redis:6379/5
ENV DEBUG_LOG_LOCATION=./debug.log
ENV ERROR_LOG_LOCATION=./error.log

ADD . /usr/src/app
COPY . .

RUN pip install --upgrade pip
RUN pip install --upgrade -r ./requirements/base.txt
# TODO cache pip install jotenkin
# RUN pip install importlib-metadata==4.13.0
# RUN pip install --upgrade -r ./requirements/local.txt
# We need this for older ways
# RUN pip install Twisted==18.9.0
RUN apt install nano
# TODO aseta static files asetuksiin RUN python manage.py collectstatic --noinput
RUN python manage.py migrate

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]