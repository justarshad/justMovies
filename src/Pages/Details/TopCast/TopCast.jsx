import './TopCast.css';
import { useSelector } from 'react-redux';

const TopCast = ({ cast }) => {
    const { url } = useSelector((store) => store.home)
    cast = cast?.slice(0, 6);
    cast = cast?.filter((item) => item?.profile_path ? true : false)

    const loaded = (e) => {
        e.target.parentNode.classList.remove('skeleton');
        e.target.classList.add('loaded');
    }


    const Cast = ({ item }) => {

        return (
            <div className="cast">
                <div className='img skeleton'>
                    <img onLoad={(e) => loaded(e)} src={url.profile + item?.profile_path} alt="" />
                </div>
                <h4 className="orignalnName">{item?.name}</h4>
                <span className="characterName">{item?.character}</span>
            </div>
        );
    }

    return (
        <div className='CastContainer'>
            {cast?.map((item, index) => (<Cast item={item} key={index} />))}
        </div>
    );
}
export default TopCast;