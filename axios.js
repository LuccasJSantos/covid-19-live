import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19',
})

const fetcher = url => instance.get(url).then(({ data }) => data)

export default fetcher
