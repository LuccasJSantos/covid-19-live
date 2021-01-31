import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import { Card, CardContent } from '@material-ui/core'
import { numberAbrevFormat, percentFormat } from '../util'

function InfoCard({
  title,
  value,
  subValue,
  badgeColor,
  isSubValuePercent = true,
}) {
  const formatSubValue = R.ifElse(
    () => isSubValuePercent,
    percentFormat,
    n => `+${numberAbrevFormat(n)}`,
  )

  return (
    <Container>
      <Badge color={badgeColor} />
      <CardStyled>
        <CardContainer>
          <h3>{title}</h3>
          <CardFooter>
            <h3>{numberAbrevFormat(value)}</h3>
            <CardSubValue>{formatSubValue(subValue)}</CardSubValue>
          </CardFooter>
        </CardContainer>
      </CardStyled>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Badge = styled.div`
  position: absolute;
  width: 6px;
  height: 40px;
  background-color: ${props => props.color};
  top: 50%;
  left: -3px;
  border-radius: 44px;
`

const CardStyled = styled(Card)`
  min-width: 200px;
  margin-top: 40px;
`

const CardContainer = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: end;
`

const CardSubValue = styled.span`
  font-weight: 300;
  font-size: 14px;
`

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
`

export default InfoCard
