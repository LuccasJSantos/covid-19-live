import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@material-ui/core'
import styled from 'styled-components'
import * as R from 'ramda'

import Header from '../components/Header'
import Cards from '../components/Cards'
import Table from '../components/Table'

export default function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})
  const [vaccinated, setVaccinated] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState({
    name: 'cases',
    color: '#2891AC',
    id: 'worldwide',
  })
  const [mapCountries, setMapCountries] = useState([])

  const getRequiredPropsFromCountries = country => ({
    country: country.country,
    cases: country.cases,
    deaths: country.deaths,
    recovered: country.recovered,
    tests: country.tests,
    id: country.countryInfo.iso3,
    flag: country.countryInfo.flag,
    lat: country.countryInfo.lat,
    long: country.countryInfo.long,
  })

  const getRequiredPropsFromSelected = country => ({
    population: country.population,
    cases: country.cases,
    todayCases: country.todayCases,
    recovered: country.recovered,
    todayRecovered: country.todayRecovered,
    deaths: country.deaths,
    todayDeaths: country.todayDeaths,
    tests: country.tests,
    vaccinated: 0,
  })

  const setVaccineAll = vaccine => {
    const [data] = Object.entries(vaccine)

    setVaccinated(data[1])
  }

  const setVaccineCountry = ({ timeline }) => {
    if (!timeline) {
      return setVaccinated(0)
    }
    const [data] = Object.entries(timeline)

    setVaccinated(data[1])
  }

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(R.map(getRequiredPropsFromCountries))
      .then(setCountries)
      .then(setMapCountries)

    fetchWorldWideVaccine()
  }, [])

  const fetchWorldWideVaccine = () => {
    const fetchVaccineAll = () => {
      return fetch(
        'https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1',
      ).then(response => response.json())
    }

    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(getRequiredPropsFromSelected)
      .then(setSelectedCountry)
      .then(fetchVaccineAll)
      .then(setVaccineAll)
  }

  const fetchCountryVaccine = id => {
    const fetchVaccineCountry = () => {
      return fetch(
        `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${id}?lastdays=1`,
      ).then(response => response.json())
    }

    fetch(`https://disease.sh/v3/covid-19/countries/${id}?strict=true`)
      .then(response => response.json())
      .then(getRequiredPropsFromSelected)
      .then(setSelectedCountry)
      .then(fetchVaccineCountry)
      .then(setVaccineCountry)
  }

  const onChangeCountryHandler = id => {
    const selectedFilterUpdated = R.assoc('id', id, selectedFilter)
    setSelectedFilter(selectedFilterUpdated)

    R.ifElse(
      R.equals('worldwide'),
      fetchWorldWideVaccine,
      fetchCountryVaccine,
    )(id)
  }

  const MapSSR = dynamic(() => import('../components/Map'))

  return (
    <Wrapper>
      <Container>
        <LeftPanel>
          <Header
            countries={countries}
            onChangeCountry={onChangeCountryHandler}
          />
          <Cards data={{ ...selectedCountry, vaccinated }} />
          <MapSSR countries={countries} filter={selectedFilter} />
        </LeftPanel>
        <RightPanel>
          <CardContent>
            <SectionTitle>Ranking de casos</SectionTitle>
            <Table countries={countries} />
          </CardContent>
        </RightPanel>
        {/* Map */}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1080px;
  margin: 30px auto 0 auto;
`

const Container = styled.div`
  display: flex;
  margin: 0 30px;
`

const LeftPanel = styled.div`
  flex: 4;
`

const RightPanel = styled(Card)`
  margin-left: 20px;
  flex: 2;
`

const SectionTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 15px;
`
