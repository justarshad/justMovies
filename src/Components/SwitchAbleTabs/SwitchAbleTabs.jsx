import './SwitchAbleTabs.css';
import { useRef } from 'react';

const SwitchAbleTabs = ({ endPoints, updateFetch }) => {

    const tabsRef = useRef();
    const tabBgRef = useRef();

    const tabHandler = (e, index, length) => {

        const distance = (tabsRef.current.clientWidth / length) * index;
        tabBgRef.current.style.left = `${distance}px`;
        updateFetch(endPoints[index].url);
    }

    return (
        <div className='SwitchAbleTabs' ref={tabsRef}>
            <span className='bg' ref={tabBgRef}></span>
            {endPoints?.map((item, index) => (<div onClick={(e) => tabHandler(e, index, endPoints?.length)} key={index}> {item.tab} </div>))}
        </div>
    );
}
export default SwitchAbleTabs;