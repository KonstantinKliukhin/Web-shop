import React, { Component } from 'react'

import { Helmet } from 'react-helmet';

import ErrorMessage from '../../components/errorMessage/ErrorMessage'

import './404.scss';


class Page404 extends Component {
    render() {
        return (
            <section className='error container'>
                <Helmet>
                    <title>Page doesn't exist</title>
                    <meta
                        name="description"
                        content="Page doesn't exist"
                    />
                    </Helmet>
                <h1 className='error__title'>Page doesn't exist</h1>
                <ErrorMessage/>
            </section>
        )
    }
}

export default Page404;