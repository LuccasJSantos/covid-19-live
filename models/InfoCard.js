const values = [
  {
    name: 'cases',
    color: '#2891AC',
    colorRGB: '40, 145, 172',
  },
  {
    name: 'recovered',
    color: '#6FAC28',
    colorRGB: '111, 172, 40',
  },
  {
    name: 'deaths',
    color: '#E45D5D',
    colorRGB: '228, 93, 93',
  },
  {
    name: 'tests',
    color: '#716CFB',
    colorRGB: '113, 108, 251',
  },
  {
    name: 'vaccinated',
    color: '#ACACAC',
    colorRGB: '172, 172, 172',
  },
]

export default values

export const getByName = name => values.find(value => value.name === name)
