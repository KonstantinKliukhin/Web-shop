import Spinner from '../components/spinner/Spinner';
import error from '../resources/img/error.png';

const setContent = (process, render, data, Loading = Spinner,) => {
    if(process.includes('idle')) {
        return null
    } else if(process.includes('error')) {
        return <img className='error-img' src={error} alt='error'/>;
    } else if(process.includes('loading')) {
        return Loading ? <Loading/> : null;
    } else if (process.every(element => element === 'confirmed')) {
        return render(data) 
    } else {
        throw new Error('unexpected process state');
    }
}

export default setContent;