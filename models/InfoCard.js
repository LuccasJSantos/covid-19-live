const values = [
  {
    name: 'cases',
    color: '#2891AC',
  },
  {
    name: 'recovered',
    color: '#6FAC28',
  },
  {
    name: 'deaths',
    color: '#E45D5D',
  },
  {
    name: 'tests',
    color: '#716CFB',
  },
  {
    name: 'vaccinated',
    color: '#ACACAC',
  },
]

export default values

export const getByName = name => values.find(value => value.name === name)
