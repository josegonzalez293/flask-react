
FROM python:3.7-slim

RUN apt-get update
RUN apt-get upgrade -y

RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app

COPY . .

CMD ["python", "-u", "app.py"]