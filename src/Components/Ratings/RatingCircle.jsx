import './RatingCircle.css';

const RatingCircle = ({ vots, size }) => {

    const ratingStyle = {
        background: `conic-gradient(${vots > 7 ? '#00ff00' : vots > 4 ? '#ff9100' : '#ff0000'} ${vots.toFixed(2) * 36}deg, #ffffff ${vots.toFixed(2) * 36}deg)`
    };
    const RatingContainerStyle = { fontSize: `${size ? size : '1rem'}` };
    return (
        <div className="RatingContainer" style={RatingContainerStyle}>
            <div className="Rating" style={ratingStyle}>
                <div className="inner">{vots?.toFixed(1)}</div>
            </div>
        </div >
    )
}

export default RatingCircle;