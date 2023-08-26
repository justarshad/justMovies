import './VideoPlayer.css';
import ReactPlayer from 'react-player/youtube';
import { RxCross2 } from 'react-icons/rx';
import { useRef, useState } from 'react';


const VideoPlayer = ({ videoId, hide, setHide }) => {

    const VideoPlayerRef = useRef();
    const hideVideoPlayer = () => {
        VideoPlayerRef.current.classList.remove('active');
        setHide(true);
    }
    return (<>
        <div className="VideoPlayer" ref={VideoPlayerRef}>
            <div className="videoContainer">
                <div className='upper'>
                    < RxCross2 onClick={() => hideVideoPlayer()} />
                </div>
                {hide ? (<></>) : (<>< ReactPlayer controls url={`https://www.youtube.com/watch?v=${videoId?.key}`} playing={false} width='100%'
                    height='100%' /></>)}

            </div>
        </div>
    </>);
}
export default VideoPlayer;