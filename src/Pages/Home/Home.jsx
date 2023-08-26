import './Home.css';
import HeroBaner from './HeroBaner/HeroBaner';
import Carousel from '../../Components/Carousel/Carousel';

const Home = () => {
    const tranding = [
        {
            tab: 'Day',
            url: '/trending/movie/day'
        },
        {
            tab: 'Week',
            url: '/trending/movie/week'
        }
    ];
    const popular = [
        {
            tab: 'Movies',
            url: '/movie/popular'
        },
        {
            tab: 'TV Shows',
            url: '/tv/popular'
        }
    ];
    const topRated = [
        {
            tab: 'Movies',
            url: '/movie/top_rated'
        },
        {
            tab: 'TV Shows',
            url: '/tv/top_rated'
        }
    ];

    return (
        <div className="Home">
            <HeroBaner />
            <Carousel heading={'Tranding'} endPoints={tranding} />
            <Carousel heading={'What\'s Popular'} endPoints={popular} />
            <Carousel heading={'Top Rated'} endPoints={topRated} />
        </div>
    );
}

export default Home;