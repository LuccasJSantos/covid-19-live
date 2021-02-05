import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import { numberFormat } from '../util'

function Table({ countries }) {
  const getCountryTableRows = ({ id, country, cases }, i) => {
    if (id === null) {
      return ''
    }

    return (
      <TableRow key={`countries_table_${id}`} odd={i % 2}>
        <td>{country}</td>
        <td>
          <strong style={{ fontWeight: 600 }}>{numberFormat(cases)}</strong>
        </td>
      </TableRow>
    )
  }

  const byCases = R.descend(R.prop('cases'))

  const sortByCases = R.sort(byCases)

  const mapThroughCountries = R.pipe(
    sortByCases,
    R.addIndex(R.map)(getCountryTableRows),
  )

  return <Container>{mapThroughCountries(countries)}</Container>
}

const Container = styled.div`
  max-height: 350px;
  overflow-y: scroll;
`

const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  font-size: 14px;
  background-color: ${props => (props.odd ? '#F6F6F6' : '#FFFFFF')};
`

export default Table
