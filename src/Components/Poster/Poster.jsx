import './Poster.css';
import noPosterImg from '../../Assets/no-poster.png';
import RatingCircle from '../Ratings/RatingCircle'

import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import dateBeutifire from '../../utils/date';

const Poster = ({ data, fetchedUrl, type }) => {
    const Navigate = useNavigate();

    const mediaType = type ? type : fetchedUrl?.split('/').find((element) => {
        return (element === 'movie' || element === 'tv');
    });

    const navigationHandler = () => {
        Navigate(`/${mediaType}/${data?.id}`);
    }
    const imgRef = useRef();
    const imgContainer = useRef();
    const loaded = () => {
        imgRef.current?.classList.add('loaded');
        imgContainer.current?.classList.remove('skeleton');
    }
    if (imgRef.current?.complete) {
        loaded();
    }
    return (<>
        {
            data ? (<div className='Poster' >
                <div ref={imgContainer} className='imgContainer skeleton' >
                    <img ref={imgRef} onLoad={() => loaded()} src={data?.poster_path ? `https://image.tmdb.org/t/p/original/${data?.poster_path}` : noPosterImg} alt="" loading='lazy' />
                </div>
                <div className="ratingAndGenres">
                    {data?.vote_average > 0 ? (< RatingCircle vots={data?.vote_average} />) : (<></>)}
                </div>
                <span className="title" onClick={() => navigationHandler()} >{(data?.original_title?.length > 24 ? data?.original_title?.slice(0, 22) + '...' : data?.title)
                    || (data?.original_name?.length > 24 ? data?.original_name?.slice(0, 22) + '...' : data?.original_name)}
                </span>
                {(data?.release_date || data?.first_air_date) && <span className="releaseDate">{dateBeutifire(data?.release_date || data?.first_air_date)}</span>}
            </div >
            ) :
                (
                    < div className="Poster" >
                        <div className="img skeleton"></div>
                        <span className="title skeleton"></span>
                        <span className="releaseDate skeleton"></span>
                    </div >
                )
        }
    </>
    );
}
export default Poster;