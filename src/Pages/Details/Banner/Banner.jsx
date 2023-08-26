import './Banner.css';
import RatingCircle from '../../../Components/Ratings/RatingCircle'
import CircularLoder from '../../../Components/Loader/Circular';
import VideoPlayer from '../../../Components/VideoPlayer/VideoPlayer';
import { HiVideoCamera } from 'react-icons/hi';
import useFetch from '../../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';

const Banner = ({ crew }) => {
    const { mediaType, id } = useParams();
    const { url } = useSelector(store => store.home);
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { data: videos } = useFetch(`/${mediaType}/${id}/videos`);

    const directors = crew?.filter((item) => { return item.job === 'Director' });
    const writers = crew?.filter((item) => { return item.job === 'Screenplay' || item.job === 'Story' || item.job === 'Writer' });

    const durationUpdater = (time) => {
        return `${(time / 60).toFixed(0)}h ${time % 60}m`;
    }

    const loaded = (e) => {
        e.target.parentNode.classList.remove('skeleton');
        e.target.classList.add('loaded');
    }
    const [hide, setHide] = useState(false);
    const openVideoPlayer = (e) => {
        const VideoPlayer = e?.target.querySelector('.VideoPlayer');
        VideoPlayer?.classList.add('active');
        if (VideoPlayer) {
            setHide(false);
        }
    }
    return (
        <>
            {
                loading ? (<CircularLoder />)
                    :
                    (
                        <div className="Banner skeleton">
                            <img className="mainBg" onLoad={(e) => loaded(e)} src={url.backdrop + data?.backdrop_path} alt="" />
                            <div className="overlay"></div>
                            <div className="content">
                                <div className="posterImgContainer skeleton">
                                    <img onLoad={(e) => loaded(e)} src={url.poster + data?.poster_path} alt="" />
                                </div>
                                <div className="right">
                                    <div className="naming">
                                        <h1 className="title">{data?.original_title}</h1>
                                        <h4 className="tagline">{data?.tagline}</h4>
                                    </div>
                                    <div className="ratingAndTraler">
                                        {data?.vote_average > 0 ? (< RatingCircle vots={data?.vote_average} size={'1.2rem'} />) : (<></>)}
                                        <div className="trailer" onClick={(e) => openVideoPlayer(e)}>
                                            < VideoPlayer videoId={videos?.results?.[0]} hide={hide} setHide={setHide} />
                                            < HiVideoCamera />
                                            Watch Trailer
                                        </div>
                                    </div>

                                    <div className="overview">
                                        <span>overview</span>
                                        <p>{data?.overview}</p>
                                    </div>
                                    <div className="info">
                                        <div>
                                            {data?.status && <div className='keyValue'>
                                                <span className='key'>Status:</span>
                                                <span className='value'>{data?.status}</span>
                                            </div>}
                                            {data?.release_date && <div className='keyValue'>
                                                <span className='key'>Release Date:</span>
                                                <span className='value'>{data?.release_date}</span>
                                            </div>}
                                            {data?.runtime && <div className='keyValue'>
                                                <span className='key'>Runtime:</span>
                                                <span className='value'>{durationUpdater(data?.runtime)}</span>
                                            </div>}
                                        </div>
                                        <div className='keyValue'>
                                            <span className='key'>Director:</span>
                                            <span className='value'>{directors && directors[0]?.name}</span>
                                        </div>
                                        <div className='keyValue'>
                                            <span className='key'>Writers:</span>
                                            <span className='value '>{writers && writers[0]?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    );
}
export default Banner;