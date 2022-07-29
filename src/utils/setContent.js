import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';


const setContent = (process, render, data, loading, ErrorComponent = ErrorMessage) => {
    if(process.includes('idle')) {
        return null
    } else if(process.includes('error')) {
        return <ErrorComponent/>
    } else if(process.includes('loading')) {
        return loading === false ? null : <Spinner/>;
    } else if (process.every(element => element === 'confirmed')) {
        return render(data) 
    } else {
        throw new Error(`unexpected process state: ${process}`);
    }
}

export default setContent;