import './HeroBaner.css';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

import useFetch from '../../../Hooks/useFetch';

const HeroBaner = () => {

    const { url } = useSelector((store) => store.home)
    const { data } = useFetch('/movie/upcoming');

    const Navigate = useNavigate();
    const searchInput = useRef();

    const backdropImgNummber = useRef(((Math.random() * 100) % 20).toFixed(0));

    const searchButtonHandler = () => {
        if (searchInput.current.value) {
            Navigate(`/search/${searchInput.current.value}`)
        }
    }

    const inputChanged = (e) => {
        if (e.key === "Enter") {
            searchButtonHandler();
        }
    }
    return (
        <div className='HeroBaner'>
            {data && <img className='backDropImage' src={url.backdrop + data?.results[backdropImgNummber.current]?.backdrop_path} alt="" />}
            <div className="overlay"></div>
            <h1>Welcome to MovieX</h1>
            <p>Millions of movies, TV shows and people to discover. Explore now.</p>
            <div className="inputArea">
                <input type="text" ref={searchInput} onKeyUp={(e) => inputChanged(e)} placeholder='Search for Movies and TV Shows....' />
                <button onClick={e => searchButtonHandler()}>Search</button>
            </div>

        </div>
    );
}

export default HeroBaner;