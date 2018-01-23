import {group} from './data'
import {Plotly} from './plotting'
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
  const layout = {title, hovermode: 'closest', xaxis: {title: 'Date'}, yaxis: {title: 'Fraction capacity'}}
  Plotly.newPlot(target, [trace], layout, {...modeBarConfig})
  // const targetElement = document.getElementById(target)
}

const yearColors = [
  '#c9e4f1',
  '#b4d9e8',
  '#9fcede',
  '#8bc3d1',
  '#78b8c4',
  '#66acb5',
  '#55a0a5',
  '#469494',
  '#388682',
  '#2c7871',
  '#216a5f',
  '#185a4d',
  '#104a3c',
  '#0a392b',
  '#05261b',
  '#02130d',
  '#000000'
] // a cubehelix colorscale I copied

export function byYear (rows, options) {
  let {title, yVar, target} = options
  let name = `${yVar} over time`
  if (title === undefined) title = 'Quabbin reservoir ' + name
  const date = new Date(2000, 1, 0)
  // debugger;
  let x = Array(366).fill(1).map(
    () => new Date(date.setDate(date.getDate() + 1))
  )
  const colors = (function* () { yield * yearColors })()
  const traces = Object.entries(group(rows).by.year())
    .sort(
      (a, b) => a[0] - b[0] // by order of years
    ).map(
      ([year, values]) => {
        return {
          x,
          y: values.map((row) => row[yVar]),
          mode: 'line',
          opacity: 0.8,
          name: year,
          line: {
            color: colors.next().value
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
