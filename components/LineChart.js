import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import chart from 'chart.js'
import * as R from 'ramda'

import { getByName } from '../models/InfoCard'

function LineChart({ data, type, title }) {
  const chartRef = useRef(null)

  const getDateAndValue = ([date, value]) => ({ date, value })

  const getValuesFromData = R.pipe(
    R.prop(type),
    R.toPairs,
    R.map(getDateAndValue),
  )

  const chartData = getValuesFromData(data)

  const getLabels = R.map(R.prop('date'))

  const getValues = R.map(R.prop('value'))

  const { color, colorRGB } = getByName(type)

  useEffect(() => {
    const context2D = chartRef.current.getContext('2d')
    new chart(context2D, {
      type: 'line',
      data: {
        //Bring in data
        labels: getLabels(chartData),
        datasets: [
          {
            backgroundColor: `rgba(${colorRGB}, 0.1)`,
            borderColor: color,
            label: title,
            data: getValues(chartData),
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              display: false,
            },
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
              },
            },
          ],
        },
      },
    })
  }, [data])

  return (
    <Container>
      <canvas ref={chartRef} />
    </Container>
  )
}

const Container = styled.div`
  margin: 10px 0;
`

export default LineChart
