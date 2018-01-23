import {group} from './data'
import {Plotly} from './plotting'
import {range} from './utils'
const modeBarConfig = {
  modeBarButtonsToRemove: ['toImage', 'sendDataToCloud', 'toggleSpikelines'],
  modeBarButtonsToAdd: [{
    name: 'export image',
    icon: Plotly.Icons.camera,
    click (gd) {
      Plotly.downloadImage(gd, {format: 'svg'})
    }
  }]
}

export function overTime (rows, options) {
  let {title, yVar, target} = options
  let name = `${yVar} over time`
  if (title === undefined) title = 'Quabbin reservoir ' + name
  const x = rows.map((row) => row.date)
  const y = rows.map((row) => row[yVar])
  const trace = {x, y, name, mode: 'lines'}
  const layout = {
    title,
    hovermode: 'closest',
    xaxis: {title: 'Date'},
    yaxis: {title: 'Fraction capacity'}
  }
  Plotly.newPlot(target, [trace], layout, {...modeBarConfig})
  // const targetElement = document.getElementById(target)
}

const yearColors = ['rgb(249,253,251)', 'rgb(231,247,243)', 'rgb(215,240,238)', 'rgb(200,233,235)', 'rgb(187,224,233)', 'rgb(176,214,232)', 'rgb(168,202,231)', 'rgb(162,191,229)', 'rgb(158,178,227)', 'rgb(156,165,223)', 'rgb(155,152,218)', 'rgb(155,139,211)', 'rgb(155,126,201)', 'rgb(155,114,190)', 'rgb(155,102,177)', 'rgb(154,92,163)', 'rgb(152,82,147)', 'rgb(149,74,130)']

export function byYear (rows, options) {
  let {title, yVar, target, yearsToShow = [...range(2000, 2018)]} = options
  let name = `${yVar} over time`
  if (title === undefined) title = 'Quabbin reservoir ' + name
  const date = new Date(2000, 1, 0)
  // debugger;
  let x = Array(366).fill(1).map(
    () => new Date(date.setDate(date.getDate() + 1))
  )
  const showYears = Object.assign({}, ...yearsToShow.map(y => ({[y]: true})))
  // const colors = (function*() { yield * yearColors })()
  const traces = Object.entries(group(rows).by.year())
    .sort(
      (a, b) => a[0] - b[0] // by order of years
    ).map(
      ([year, values], index) => {
        let color = year in showYears ? yearColors[index] : '#ccc'
        return {
          x,
          y: values.map((row) => row[yVar]),
          mode: 'line',
          opacity: 0.8,
          name: year,
          showlegend: year in showYears,
          line: {
            color
          }
        }
      }
    )
  let layout = {
    title,
    hovermode: 'closest',
    xaxis: {
      title: 'Date',
      tickformat: '%b'
    },
    yaxis: {
      title: 'Fraction capacity'
    }
  }
  Plotly.newPlot(target, traces, layout, {...modeBarConfig})
}

// export function byMonth (data, options) {
//   let {title, yVar, target, onHover} = options
//   let name = `${yVar} over time`
//   if (title === undefined) title = 'Quabbin reservoir ' + name
//   let x = [...range(0, 366)]
//   const colors = (function* () { yield * yearColors })()
//   let years = Object.entries(data).map(([name, y]) => {
//
//     return {
//       x, y: y.map((row) => row[yVar]), name, mode: 'lines', opacity: 0.5,
//       line: {
//         color: colors.next().value
//       }
//     }
//   })
//   let layout = {title}
//   Plotly.newPlot(target, years, layout)
// }
