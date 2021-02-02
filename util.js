import numeral from 'numeral'

export const percentFormat = x => `${parseFloat(x * 100).toFixed(1)}%`

export const numberAbrevFormat = x =>
  x < 1000 ? x : numeral(x).format('0.0a').toUpperCase()

export const numberFormat = x => numeral(x).format('0,0')

export const mapRange = (num, minFrom, maxFrom, minTo, maxTo) => {
  return ((num - minFrom) * (maxTo - minTo)) / (maxFrom - minFrom) + minTo
}
