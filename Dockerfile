# Compila os arquivos React/Vite com uma versão compatível com o Vite Plus.
FROM node:22.18.0-bookworm-slim AS frontend

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Aplicação Laravel + Apache.
FROM php:8.3-apache AS app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    libsqlite3-dev pkg-config \
    && docker-php-ext-install -j"$(nproc)" \
       pdo_mysql pdo_sqlite sqlite3 mbstring zip exif pcntl bcmath gd \
    && a2enmod rewrite \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/var/www/html/database/database.sqlite
ENV PORT=10000

WORKDIR /var/www/html
COPY . .
COPY --from=frontend /app/public/build ./public/build

# Render encaminha o tráfego para a porta 10000 por padrão.
RUN sed -ri 's/Listen 80/Listen 10000/' /etc/apache2/ports.conf \
    && sed -ri 's/<VirtualHost \*:80>/<VirtualHost *:10000>/' /etc/apache2/sites-available/000-default.conf \
    && sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
       /etc/apache2/sites-available/000-default.conf \
       /etc/apache2/apache2.conf \
    && composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader \
    && mkdir -p storage/framework/cache/data storage/framework/sessions \
       storage/framework/views storage/logs bootstrap/cache database \
    && touch database/database.sqlite \
    && chown -R www-data:www-data storage bootstrap/cache database \
    && chmod -R ug+rwX storage bootstrap/cache database

EXPOSE 10000

# Migrações e conteúdos são idempotentes; podem ser executados em cada inicialização.
CMD ["sh", "-c", "php artisan migrate --force && php artisan db:seed --force && apache2-foreground"]
