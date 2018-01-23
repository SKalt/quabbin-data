import {overTime, byYear} from './charts'
import {raw} from './data'
import {Plotly} from './plotting'
overTime(raw, {
  target: 'over-time',
  yVar: 'fraction full',
  title: 'Fraction capacity filled over time'
})
byYear(raw, {
  target: 'by-year',
  yVar: 'fraction full',
  title: 'Fraction capacity filled each year'
})

let containers = ['over-time', 'by-year']
  .map((id) => document.getElementById(id))
window.onresize = function () {
  for (let c of containers) {
    Plotly.Plots.resize(c)
  }
}
