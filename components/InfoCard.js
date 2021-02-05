import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import { Card, CardContent } from '@material-ui/core'
import { numberAbrevFormat, percentFormat } from '../util'

function InfoCard({
  name,
  title,
  value,
  subValue,
  badgeColor,
  selected,
  isSubValuePercent = true,
  onClick,
}) {
  const formatSubValue = R.ifElse(
    () => isSubValuePercent,
    percentFormat,
    n => `+${numberAbrevFormat(n)}`,
  )

  return (
    <Container onClick={() => onClick(name)}>
      <Badge color={badgeColor} selected={selected} />
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
  width: ${props => (props.selected ? '12px' : '6px')};
  height: ${props => (props.selected ? '124px' : '40px')};
  background-color: ${props => props.color};
  top: ${props => (props.selected ? '40px' : '50%')};
  left: ${props => (props.selected ? '-3px' : '-3px')};
  border-radius: ${props => (props.selected ? '5px 0 0 5px' : '44px')};
  transition: all ease-out 0.2s;
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
