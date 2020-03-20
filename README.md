# weather-app

Simple weather app which uses Geolocation API, OpenWeather API and Google Geocoding API to provide current weather data and forecast weather data for selected city/area.

## Current weather view

If you allow to share your location initial data fill be fetched after entering main page.

To check current weather at desired location:

1. Start typing location name in the input
2. Select location from available options
3. Click `Check` button to fetch fresh data

If you click `More` button on the current weather info card you will be redirected to ...

## Forecast weather view

... where you will see forecast weather data for previoslu selected location.

### TODO

- [x] Move current weather data to store
- [x] Fetch forecast weather data
- [x] Display forecast weather data
- [ ] Fix page overflow on mobile view
- [x] Show preloader while fetching data
- [ ] Write some more unit tests
- [ ] Map api responses to objects to separate views from services

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```
