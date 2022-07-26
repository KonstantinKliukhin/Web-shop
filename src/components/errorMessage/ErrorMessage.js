
import { Component } from 'react'

import errorImg from './error.png';


class ErrorMessage extends Component {
  render() {
    return (
      <img className='error-img' src={errorImg} alt="Error" />
    )
  }
}

export default ErrorMessage;