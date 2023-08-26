import './SearchResult.css';
import Poster from '../../Components/Poster/Poster';
import Loder from '../../Components/Loader/Circular';
import fetchDataFromApi from '../../utils/api'
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useReducer, useRef } from 'react';

const SearchResult = () => {

    const initialState = {
        page: 1,
        data: [],
        lastPage: 1,
        loading: false,
        noResult: false
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "PAGE":
                return { ...state, page: action.payload };
            case "DATA":
                return { ...state, data: action.payload };
            case "LASTPAGE":
                return { ...state, lastPage: action.payload };
            case "LOADING":
                return { ...state, loading: action.payload };
            case "NORESULT":
                return { ...state, noResult: true };
            case "RESET":
                return { ...initialState };
            default:
                return state;
        }
    }
    const { queary } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const location = useLocation();

    useEffect(() => {
        dispatch({ type: 'RESET' });
        fetchDataFromApi(`/search/multi?query=${queary}&page=${state.page}`)
            .then(res => {
                res?.results.length === 0 ? dispatch({ type: 'NORESULT' }) : dispatch({ type: 'DATA', payload: [...res.results] });
                dispatch({ type: 'LASTPAGE', payload: res?.total_pages });
                dispatch({ type: 'LOADING', payload: false });
            });
    }, [location]);

    useEffect(() => {
        if (!state.loading && state.page <= state.lastPage) {
            dispatch({ type: 'LOADING', payload: true });
            fetchDataFromApi(`/search/multi?query=${queary}&page=${state.page}`)
                .then(res => {
                    dispatch({ type: 'DATA', payload: [...state.data, ...res.results] });
                    dispatch({ type: 'LASTPAGE', payload: res?.total_pages });
                    dispatch({ type: 'LOADING', payload: false });
                });
        }
    }, [state.page]);

    const pageNo = useRef(1);
    const handelInfiniteScroll = () => {
        if (!state.loading && window.innerHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 45) {
            dispatch({ type: 'PAGE', payload: pageNo.current + 1 });
            pageNo.current += 1;
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handelInfiniteScroll);
        return () => window.removeEventListener('scroll', handelInfiniteScroll);
    }, []);

    return (
        <div className='SearchResult'>
            <h1>{!state.noResult ? (`Search Results for Queary "${queary}" `) : (`There is no result found four your Queary "${queary}"`)}</h1>
            <div className="container">
                {state.data?.map((item) => {
                    switch (item?.media_type) {
                        case 'tv':
                            return (<Poster data={item} key={item?.id} type={'tv'} />);
                        case 'movie':
                            return (<Poster data={item} key={item?.id} type={'movie'} />);
                        // case 'person':
                        //     return (<Poster data={item} key={item?.id} type={'movie'} />);
                        default:
                            return (<></>);
                    }
                })
                }
                <div className="loderContainer">{state.loading ? (<Loder />) : (<></>)}</div>
            </div>
        </div>
    );
}

export default SearchResult;