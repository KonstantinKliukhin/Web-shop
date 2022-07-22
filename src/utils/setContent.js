import spinner from '../resources/img/spinner.svg';
import error from '../resources/img/error.png';

const setContent = (process, render, data) => {
    if(process.includes('idle')) {
        return null
    } else if(process.includes('error')) {
        return <img className='error-img' src={error} alt='error'/>;
    } else if(process.includes('loading')) {
        return <img className='loading-img' src={spinner} alt='loading'/>;
    } else if (process.every(element => element === 'confirmed')) {
        return render(data) 
    } else {
        throw new Error('unexpected process state');
    }
}

export default setContent;