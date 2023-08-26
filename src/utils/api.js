const baseUrl = 'https://api.themoviedb.org/3';
const tmdbApiToken= process.env.REACT_APP_API_TOKEN;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbApiToken}`
    }
};
const fetchDataFromApi = async (url) => {

    try {
        const res = await fetch(baseUrl + url, options);
        const data = await res.json();
        return data;
        // if(data?.success){
        //     return data;
        // }
        // else{
        //     throw new Error(`Error with status Code: ${data?.status_code} and Message is: ${data?.status_message}`);
        // }
        
    }
    catch (err) {
        // alert('Check Your Internet Connection');
        console.log(err);
    }
}
export default fetchDataFromApi;