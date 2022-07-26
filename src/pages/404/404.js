import React, { Component } from 'react'

import ErrorMessage from '../../components/errorMessage/ErrorMessage'

import './404.scss';

class Page404 extends Component {
  render() {
    return (
      <section className='error container'>
        <h1 className='error__title'>Page is not exist</h1>
        <ErrorMessage/>
      </section>
    )
  }
}

export default Page404;