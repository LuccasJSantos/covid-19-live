import * as R from 'ramda'
import React, { useState } from 'react'
import { MenuItem, Select } from '@material-ui/core'

import styled from 'styled-components'

function Header({ countries, onChangeCountry }) {
  const [selectedCountry, setSelectedCountry] = useState('worldwide')
  const [flag, setFlag] = useState('')

  const getCountryMenuItems = ({ id, country }) => (
    <MenuItem key={id} value={id}>
      {country}
    </MenuItem>
  )

  const getCountryInstance = R.flip(R.find)(countries)

  const changeCountryHandler = id => {
    onChangeCountry(id)

    const equalId = R.propEq('id', id)
    const countryFlag = getCountryInstance(equalId) || { flag: '' }

    setSelectedCountry(id)
    setFlag(countryFlag.flag)
  }

  return (
    <Container>
      <h2>COVID 19 Live</h2>
      <CountrySelector>
        <CountryFlag src={flag} />
        <Select
          value={selectedCountry}
          variant='outlined'
          onChange={e => changeCountryHandler(e.target.value)}
        >
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {countries.map(getCountryMenuItems)}
        </Select>
      </CountrySelector>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CountrySelector = styled.div`
  display: flex;
  align-items: center;
`

const CountryFlag = styled.img`
  width: 44px;
  border-radius: 6px;
  margin-right: 15px;
`

export default Header
