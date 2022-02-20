FROM ruby:2.7.0

RUN apt-get update -qq && apt-get -y install \
    build-essential \
    libpq-dev \
    default-mysql-client \
    nodejs 

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app
COPY Gemfile.lock /app

RUN gem install bundler && bundle install
COPY . /app

EXPOSE 3000