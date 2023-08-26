import './Details.css';
import Banner from './Banner/Banner';
import TopCast from './TopCast/TopCast';
import Carousel from '../../Components/Carousel/Carousel'
import CircularLoader from '../..//Components/Loader/Circular';

import useFetch from '../../Hooks/useFetch';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: credits, loading } = useFetch(`/${mediaType}/${id}/credits`);

    return (<>
        {loading ? (<CircularLoader />)
            :
            (<div className='Details'>
                < Banner crew={credits?.crew} />
                < TopCast cast={credits?.cast} />
                < Carousel heading={'Similar'} fetchUrl={`/${mediaType}/${id}/similar`} />
                < Carousel heading={'Recomandation'} fetchUrl={`/${mediaType}/${id}/recommendations`} />
            </div>)}
    </>
    );
}

export default Details;