import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@material-ui/core'
import styled from 'styled-components'
import * as R from 'ramda'

import Header from '../components/Header'
import Cards from '../components/Cards'
import Table from '../components/Table'

import { getByName } from '../models/InfoCard'
import axios from '../axios'
import diseaseReq from '../requests/disease'
import disease from '../requests/disease'

export default function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})
  const [vaccinated, setVaccinated] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState({
    name: 'cases',
    color: '#2891AC',
    id: 'worldwide',
  })
  const [chartData, setChartData] = useState({})

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

  const setVaccineCountry = vaccine => {
    if (!vaccine) {
      return setVaccinated(0)
    }
    const [data] = Object.entries(vaccine.timeline)

    setVaccinated(data[1])
  }

  useEffect(async () => {
    const countriesGeneral = await axios(diseaseReq.countriesGeneral()).then(
      R.map(getRequiredPropsFromCountries),
    )

    await fetchWorlwideData()

    setCountries(countriesGeneral)
  }, [])

  const fetchWorlwideData = async () => {
    const worldwide = await axios(diseaseReq.worldwide()).then(
      getRequiredPropsFromSelected,
    )

    const worldwideVaccines = await axios(diseaseReq.worldwideVaccines())

    const worldwideHistorical = await axios(diseaseReq.worldwideHistorical())

    setSelectedCountry(worldwide)
    setVaccineAll(worldwideVaccines)
    setChartData(worldwideHistorical)

    return Promise.resolve()
  }

  const fetchCountryData = async id => {
    const country = await axios(diseaseReq.byCountryGeneral(id)).then(
      getRequiredPropsFromSelected,
    )

    const countryVaccines = await axios(diseaseReq.byCountryVaccines(id)).catch(
      console.error,
    )

    const countryHistorical = await axios(
      diseaseReq.byCountryHistorical(id),
    ).then(res => res.timeline)

    setSelectedCountry(country)
    setVaccineCountry(countryVaccines)
    setChartData(countryHistorical)

    return Promise.resolve()
  }

  const onChangeCountryHandler = id => {
    const selectedFilterUpdated = R.assoc('id', id, selectedFilter)
    setSelectedFilter(selectedFilterUpdated)

    R.ifElse(R.equals('worldwide'), fetchWorlwideData, fetchCountryData)(id)
  }

  const onChangeSelectedFilter = name => {
    if (name === 'vaccinated') {
      return
    }

    const infoCardValue = getByName(name)
    const filter = R.mergeRight(selectedFilter, infoCardValue)

    setSelectedFilter(filter)
  }

  const MapSSR = dynamic(() => import('../components/Map'))

  const LineChartSSR = dynamic(() => import('../components/LineChart'))

  return (
    <Wrapper>
      <Container>
        <LeftPanel>
          <Header
            countries={countries}
            color={selectedFilter.color}
            onChangeCountry={onChangeCountryHandler}
          />
          <Cards
            data={{ ...selectedCountry, vaccinated }}
            selected={selectedFilter}
            onChangeFilter={onChangeSelectedFilter}
          />
          <MapSSR countries={countries} filter={selectedFilter} />
        </LeftPanel>
        <RightPanel>
          <CardContent>
            <SectionTitle>Ranking de casos</SectionTitle>
            <Table countries={countries} />
          </CardContent>
          <CardContent>
            <SectionTitle>Acumulado (30 dias)</SectionTitle>
            <LineChartSSR data={chartData} title='Casos' type='cases' />
            <LineChartSSR
              data={chartData}
              title='Recuperadxs'
              type='recovered'
            />
            <LineChartSSR data={chartData} title='Mortes' type='deaths' />
          </CardContent>
        </RightPanel>
        {/* Map */}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1080px;
  margin: 30px auto 30px auto;
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
