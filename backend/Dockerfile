FROM python:3.12-alpine

WORKDIR /app/backend

RUN pip install --upgrade pip 

COPY . /app/backend

RUN pip install -r requirements.txt

RUN python manage.py migrate
