import './Explore.css';
import Poster from '../../Components/Poster/Poster';
import CircularLoader from '../../Components/Loader/Circular';

import fetchDataFromApi from '../../utils/api';

import { useEffect, useReducer, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

const Explore = () => {

    const filterOptions = [
        {
            text: 'Popularity Ascending',
            parem: 'popularity.asc'
        },
        {
            text: 'Popularity Decending',
            parem: 'popularity.desc'
        },
        {
            text: 'Revenue Ascending',
            parem: 'revenue.asc'
        },
        {
            text: 'Revenue Decending',
            parem: 'renveue.desc'
        },
        {
            text: 'Popular',
            parem: 'vote_average.desc'
        },
        {
            text: 'Latest',
            parem: 'primary_relese_date.desc'
        }
    ];

    const location = useLocation();
    const { mediaType } = useParams();

    const initialState = {
        results: [],
        page: 1,
        loading: false,
        filter: 'popularity.desc',
        firstLoading: false
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case 'RESULTS':
                return { ...state, results: action.payload };
            case 'PAGE':
                return { ...state, page: action.payload };
            case 'LOADING':
                return { ...state, loading: action.payload };
            case 'FILTER':
                return { ...state, filter: action.payload };
            case 'FIRSTLOADING':
                return { ...state, firstLoading: action.payload };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const pageNo = useRef(1)
    const handelInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 45) {
            dispatch({ type: 'PAGE', payload: pageNo.current + 1 });
            pageNo.current = pageNo.current + 1;
        }
    }

    const dropdownListRef = useRef();
    const dropdownLSelectRef = useRef();

    const dropdownClicked = () => {
        dropdownListRef.current.classList.toggle('active');
        const icon = dropdownLSelectRef.current.childNodes[1];

        if (dropdownListRef.current.classList.contains('active')) {
            icon.style.transform = `rotate(180deg)`;
        } else {
            icon.style.transform = `rotate(0deg)`;
        }
    }
    const filterChanged = (e, parem) => {
        dropdownLSelectRef.current.childNodes[0].textContent = e.target.textContent;
        dropdownListRef.current.classList.remove('active');
        const icon = dropdownLSelectRef.current.childNodes[1];
        icon.style.transform = `rotate(0deg)`;
        dispatch({ type: 'PAGE', payload: 1 });
        dispatch({ type: "FILTER", payload: parem });
    }

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: true });
        fetchDataFromApi(`/discover/${mediaType}?page=${state.page}&sort_by=${state.filter}`).then(res => {
            dispatch({ type: 'RESULTS', payload: [...state.results, ...res?.results] });
            dispatch({ type: 'LOADING', payload: false });
        });
    }, [state.page]);

    useEffect(() => {
        dispatch({ type: 'FIRSTLOADING', payload: true });
        fetchDataFromApi(`/discover/${mediaType}?page=${state.page}&sort_by=${state.filter}`).then(res => {
            dispatch({ type: 'RESULTS', payload: [...res?.results] });
            dispatch({ type: 'FIRSTLOADING', payload: false });
        });
    }, [state.filter, location]);

    useEffect(() => {
        window.addEventListener('scroll', () => handelInfiniteScroll());
        return () => window.removeEventListener('scroll', () => handelInfiniteScroll());
    }, []);

    return (

        <div className="Explore">
            <div className="upper">
                <h1>Explore</h1>
                <div className="dropdown">
                    <div className="select" onClick={(e) => dropdownClicked()} ref={dropdownLSelectRef}>
                        <span>Popularity Decending</span>
                        < IoIosArrowDown />
                    </div>
                    <ul ref={dropdownListRef}>
                        {filterOptions.map((item, index) => (<li onClick={(e) => filterChanged(e, item.parem)} key={index}>{item.text}</li>))}
                    </ul>
                </div>
            </div>
            {
                state.firstLoading ?
                    (< CircularLoader />)
                    :
                    (
                        <div className="container">
                            {state.results.map(item => { return !item?.adult && < Poster key={item.id} data={item} fetchedUrl={mediaType} /> })}
                            {state.loading ? (<div className="loaderContainer">< CircularLoader /></div>) : (<></>)}
                        </div>

                    )
            }
        </div>
    );
}

export default Explore;