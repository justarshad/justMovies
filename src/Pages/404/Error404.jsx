import { useNavigate } from 'react-router-dom';
import './Error404.css';

const Error404 = () => {

    const Navigate = useNavigate();
    return (
        <div className='Error404'>
            <h1>Error 404</h1>
            <span>This Page Dosent Exsit Please Go Back</span>
            <button onClick={()=>Navigate('/')}>Click Here</button>
        </div>
    );
}

export default Error404;