// load only the required plotly modules
import Plotly from 'plotly.js/lib/core'
import scatter from 'plotly.js/lib/scatter' // a re-export of src/scatter/
const d3 = Plotly.d3
// make global variables to facilitate experimentation
window.Plotly = Plotly
window.d3 = d3

Plotly.register([
  scatter
])

export {Plotly, d3}
