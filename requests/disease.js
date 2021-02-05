export default {
  worldwide: () => '/all',
  worldwideHistorical: () => '/historical/all?lastdays=30',
  worldwideVaccines: () => '/vaccine/coverage?lastdays=1',
  countriesGeneral: () => '/countries',
  byCountryHistorical: id =>
    `https://disease.sh/v3/covid-19/historical/${id}?lastdays=30`,
  byCountryGeneral: id => `/countries/${id}?strict=true`,
  byCountryVaccines: id => `/vaccine/coverage/countries/${id}?lastdays=1`,
}
