import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Explore from './Pages/Explore/Explore';
import Details from './Pages/Details/Details';
import SearchResult from './Pages/SearchResult/SearchResult';
import Error404 from './Pages/404/Error404';

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import fetchDataFromApi from './utils/api';

import { useDispatch } from 'react-redux';
import { getApiConfiguration } from './Store/slices/homeSlice';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFromApi('/configuration').then(res => {
      dispatch(getApiConfiguration({
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      }));
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:queary' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
        <Footer />
      </ BrowserRouter >
    </div>
  );
}

export default App;
