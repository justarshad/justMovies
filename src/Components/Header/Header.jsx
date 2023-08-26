import './Header.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { HiOutlineSearch } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

const HeroSearch = () => {
    const hideHeroSearch = () => {
        const heroSearchElement = document.querySelector('header .HeroSearch');
        heroSearchElement.style.top = '-10rem';
    }
    const Navigate = useNavigate();
    const searchInput = useRef();
    const searchButtonHandler = () => {
        if (searchInput.current.value) {
            Navigate(`/search/${searchInput.current.value}`)
            searchInput.current.value = '';
            hideHeroSearch();
        }
    }
    const inputChanged = (e) => {
        if (e.key === "Enter") {
            searchButtonHandler();
        }
    }
    return (
        <div className="HeroSearch">
            < RxCross2 onClick={() => hideHeroSearch()} />
            <div>
                <input type="text" ref={searchInput} placeholder='Type here...' onKeyUp={(e) => inputChanged(e)} />
                <button onClick={e => searchButtonHandler()}>Search</button>
            </div>

        </div>
    );
}

const Header = () => {

    const Navigate = useNavigate();
    const location = useLocation();
    const headerRef = useRef();
    // const [lastScrollY, setLastScrollY] = useState(0);
    const lastScrollY = useRef(0);

    const showHeroSearch = () => {
        const heroSearchElement = document.querySelector('header .HeroSearch');
        heroSearchElement.style.top = 'calc(100% + 1.4rem)';
    }

    const handleScroll = () => {
        if (window.scrollY < lastScrollY.current) {
            headerRef.current.classList.remove('hide');
        } else {
            if (window.scrollY >= 200) {
                headerRef.current.classList.add('hide');
            }
        }

        if (window.scrollY >= 250) {
            headerRef.current.classList.add('background');
        } else {
            headerRef.current.classList.remove('background');
        }
        lastScrollY.current = window.scrollY;
        // setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header ref={headerRef}>
            <h1 onClick={() => Navigate('/')} >JustMovies</h1>
            <ul>
                <li onClick={() => Navigate('/explore/movie')}>Movies</li>
                <li onClick={() => Navigate('/explore/tv')}>TV Shows</li>
                <li onClick={() => showHeroSearch()}><HiOutlineSearch /></li>
                < HeroSearch />
            </ul>
        </header>
    );
}

export default Header;