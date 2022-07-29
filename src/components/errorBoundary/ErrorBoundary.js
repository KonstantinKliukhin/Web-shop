import { Component } from 'react'

import ErrorMessage from "../errorMessage/ErrorMessage";

import './errorBoundary.scss';


class ErrorBoundery extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)

        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return (
                <div className='error-block'>
                    <ErrorMessage/>
                </div>
            )
            
        }

        return this.props.children;
    }
}

export default ErrorBoundery;