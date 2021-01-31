import numeral from 'numeral'

export const percentFormat = x => `${parseFloat(x * 100).toFixed(1)}%`

export const numberAbrevFormat = x => numeral(x).format('0.0a').toUpperCase()

export const numberFormat = x => numeral(x).format('0,0')
