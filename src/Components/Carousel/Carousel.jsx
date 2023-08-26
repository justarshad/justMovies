import './Carousel.css';
import SwitchAbleTabs from '../SwitchAbleTabs/SwitchAbleTabs';
import Poster from '../Poster/Poster';
import CircularLoader from '../Loader/Circular';

import useFetch from '../../Hooks/useFetch';
import { useRef, useState } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

const CarouselData = ({ url, setIsEmpty }) => {

    const mainElement = useRef();
    const { data, loading } = useFetch(url);

    const scrollToLeft = () => {
        const element = mainElement.current;
        element.scrollBy(-element.offsetWidth, 0);
    }

    const scrollToRight = () => {
        const element = mainElement.current;
        element.scrollBy(element.offsetWidth, 0);
    }
    return (
        <>{loading ?
            (
                <CircularLoader />
            )
            :
            (
                <div className="mainWraper">
                    {data?.results.length === 0 ? setIsEmpty(true) : (<></>)}
                    <button onClick={() => scrollToLeft()} className='leftBtn'><BsArrowLeftCircle /></button>
                    <div className="main" ref={mainElement}>
                        {data?.results?.map((item) => (<Poster data={item} key={item?.id} fetchedUrl={url} />))}
                    </div>
                    <button onClick={() => scrollToRight()} className='rightBtn'><BsArrowRightCircle /></button>
                </div>
            )}
        </>
    );
}

const Carousel = ({ heading, endPoints, fetchUrl }) => {

    const [url, setUrl] = useState(endPoints ? endPoints[0].url : fetchUrl);
    const [isEmpty, setIsEmpty] = useState(false);
    return (

        <>
            {!isEmpty ? (<div className="Carousel">
                <div className="upper">
                    <span className='heading'>{heading}</span>
                    {endPoints && < SwitchAbleTabs endPoints={endPoints} updateFetch={setUrl} />}
                </div>
                < CarouselData url={url} setIsEmpty={setIsEmpty} />
            </div >) : (<></>)
            }
        </>);
}
export default Carousel;