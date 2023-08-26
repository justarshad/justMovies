import { useState, useEffect } from "react";
import fetchDataFromApi from '../utils/api';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchDataFromApi(url).then(res => {
            setLoading(false);
            setData(res);
        }).catch(err => {
            setLoading(false);
            console.log('An Error Accurd Informing you from custom useFetch Hooks');
            setError(true);
        })
    }, [url]);

    return { data, loading, error };
};
export default useFetch;