
import { Component } from 'react'

class Spinner extends Component {
  render() {
    return (
        <svg className='loading-img' style={{"margin": 'auto', 'background': 'rgb(255, 255, 255)', 'display': 'block', 'shapeRendering': 'auto', 'maxWidth': '200px', 'maxHeight': '200px'}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g>
            <path d="M50 19A31 31 0 1 0 72.9285639443369 29.13661208119703" fill="none" stroke="#5ece7b" strokeWidth="12"></path>
            <path d="M49 0L49 38L68 19L49 0" fill="#5ece7b"></path>
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9174311926605504s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
          </g>
        </svg>
    )
  }
}
export default Spinner;
