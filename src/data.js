// since it's a static file, it saves a request to inline, minify, & gzip it
// with the rest of the js code using Webpack's csv-loader.
import rawData from '../data/without_date.csv' // saves ~50% gzipped filesize
import {merge, range} from './utils'
function populateDates (data) {
  if (!Array.isArray(data)) throw new Error(`wrong input: ${JSON.stringify(data)}`)
  let date = new Date(2000, 0, 0) // Dec 31, 1999
  let dayOfYear = 0 // 1-indexed
  return data.map(
    (row, index) => {
      // calculate the date from the index, which is the number of days after
      // Jan 1, 2001.
      date.setDate(date.getDate() + 1)
      let month = date.getMonth() + 1 // correct for 0-indexed months
      let year = date.getFullYear()
      if (month === 1 && dayOfYear >= 356) dayOfYear = 0
      return {
        ...row,
        date: new Date(date),
        dayOfYear: dayOfYear++,
        year,
        month
      }
    }
  )
}

export const raw = populateDates(rawData)
window.raw = raw
// for reasons unknown, the groupby transform isn't working, so I'm rolling my
// own.
export const group = (data) => {
  return {
    by: {
      year () {
        const years = merge([...range(2000, 2018)].map((year) => ({[year]: []})))
        data.forEach(
          (row) => years[row.year].push(row)
        )
        return years
      }
    }
  }
}

// import {d3} from './plotting'
// /**
//  * how I'd get the data if it were from an API
//  * @return {Promise} resolves to the csv as an array[{[col]: value}]
//  */
// function getData () {
//   return new Promise((resolve) => {
//     d3.csv('static/without_dates.csv').get(resolve)
//   })
// }
