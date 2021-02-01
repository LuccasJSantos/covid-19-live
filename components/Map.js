import { Card, CardContent } from '@material-ui/core'
import styled from 'styled-components'
import * as R from 'ramda'
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

import { numberAbrevFormat, mapRange } from '../util'

const Map = ({ countries, filter }) => {
  const byCountry = country => country.id === filter.id

  const getMapRequiredPropsFromCoutries = country => ({
    country: country.country,
    value: country[filter.name],
    id: country.id,
    lat: country.lat,
    long: country.long,
  })

  debugger

  const notWorldwide = () => filter.id !== 'worldwide'

  const filterByCountryIfNotWorldWide = R.when(
    notWorldwide,
    R.filter(byCountry),
  )

  const countriesFilterAndMapper = R.pipe(
    filterByCountryIfNotWorldWide,
    R.map(getMapRequiredPropsFromCoutries),
  )

  const countriesList = countriesFilterAndMapper(countries)

  const valuesList = countries.map(R.prop(filter.name))

  const maxValue = Math.max(...valuesList)
  const minValue = Math.min(...valuesList)

  const getCountryCircleMarker = country => {
    const radius = mapRange(country.value, minValue, maxValue, 5, 50)

    return (
      <CircleMarker
        center={[country.lat, country.long]}
        fillOpacity={0.15}
        fillColor={filter.color}
        radius={radius}
        color={filter.color}
        weight={2}
      >
        <Popup>
          {country.country}: {numberAbrevFormat(country.value)}
        </Popup>
      </CircleMarker>
    )
  }

  const mapOptions =
    filter.id === 'worldwide'
      ? { center: [0, 0], zoom: 2 }
      : { center: [countriesList[0].lat, countriesList[0].long], zoom: 3 }

  return (
    <Container>
      <Card>
        <CardContent>
          <MapContainer
            center={mapOptions.center}
            zoom={mapOptions.zoom}
            scrollWheelZoom={false}
            maxZoom={mapOptions.zoom}
            minZoom={mapOptions.zoom}
            style={{ height: '550px', width: '100%' }}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {countriesList.map(getCountryCircleMarker)}
          </MapContainer>
        </CardContent>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 20px;
`

export default Map
