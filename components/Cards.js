import React, { useState } from 'react'
import styled from 'styled-components'

import { numberAbrevFormat } from '../util'
import InfoCard from './InfoCard'

const cardsWidth = '210px'

function Cards({ data, selected, onChangeFilter }) {
  return (
    <Container>
      <PopulationContainer>
        <PopulationHeader>População</PopulationHeader>
        <PopulationValue>{numberAbrevFormat(data.population)}</PopulationValue>
      </PopulationContainer>
      <InfoCard
        name='cases'
        title='Casos'
        value={data.cases}
        subValue={data.todayCases}
        isSubValuePercent={false}
        badgeColor='#2891AC'
        selected={selected.name === 'cases'}
        onClick={onChangeFilter}
      />
      <InfoCard
        name='recovered'
        title='Recuperadxs'
        value={data.recovered}
        subValue={data.todayRecovered}
        isSubValuePercent={false}
        badgeColor='#6FAC28'
        selected={selected.name === 'recovered'}
        onClick={onChangeFilter}
      />
      <InfoCard
        name='deaths'
        title='Mortes'
        value={data.deaths}
        subValue={data.todayDeaths}
        width={cardsWidth}
        isSubValuePercent={false}
        badgeColor='#E45D5D'
        selected={selected.name === 'deaths'}
        onClick={onChangeFilter}
      />
      <InfoCard
        name='tests'
        title='Testes'
        value={data.tests}
        subValue={data.tests / data.population}
        width={cardsWidth}
        badgeColor='#716CFB'
        selected={selected.name === 'tests'}
        onClick={onChangeFilter}
      />
      <InfoCard
        name='vaccinated'
        title='Vacinadxs'
        value={data.vaccinated}
        subValue={data.vaccinated / data.population}
        width={cardsWidth}
        badgeColor='#ACACAC'
        selected={selected.name === 'vaccinated'}
        onClick={onChangeFilter}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const PopulationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: ${cardsWidth};
  margin-top: 40px;
`

const PopulationHeader = styled.span`
  color: #b3b5b7;
`

const PopulationValue = styled.h1`
  font-weight: 500;
  margin-top: 8px;
`

export default Cards
