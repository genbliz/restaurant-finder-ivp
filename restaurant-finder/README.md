# Restaurants Finder


## Clone the repo
```bash
git clone https://github.com/genbliz/restaurant-finder-ivp.git
```

## Env Variables

create `.env` file and add the following variables

```bash
PORT=3000

PG_DB_HOST=<db_host>
PG_DB_PORT=<db_port>
PG_DB_USER=<db_user>
PG_DB_PASS=<db_password>
PG_DB_NAME=<db_name>
```

## Installation

```bash
$ npm install
```

## Run the application

```bash
# development
$ npm run start

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

### API Routes

#### 1. Find Restaurants Finder within a City

method: GET

``http://localhost:3000/restaurants``

```json
[
  {

  }
]
```

#### 2. Find One Restaurants

method: GET

``http://localhost:3000/restaurants/{id}``

Response

```json
{
    "id": "",
    "name": "",
    "city": "",
    "address": "",
    "rating": null,
    "price_range_from": null,
    "price_range_to": null,
    "latitude": 0,
    "longitude": 0,
    "created_at": "",
    "updated_at": ""
}
```
#### 3. Create Restaurant

method: POST

``http://localhost:3000/restaurants``

Request

```json
{
  "name": "",
  "city": "",
  "address": "",
  "latitude": 0,
  "longitude": 0
}
```

Response

```json
{

}
```

#### 4. Delete Restaurant

method: DELETE

``http://localhost:3000/restaurants/{id}``

Response

```json
{
  "response" : "restaurant deleted"
}
```
