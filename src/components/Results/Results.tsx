import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import './Results.scss';
import audioIconGIF from './audio.gif';
import audioIconPNG from './audio.png';
import ResultsAccordion from '../ResultsAccordion/ResultsAccordion';

const Results = () => {
    const [audioHover, setAudioHover] = useState(false);
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    if (typeof state.translation === 'object' && state.translation) {
        return ( 
        <div className="results">
            <div className="results__preview">
                <div className="result__word">
                    {state.translation[0].text.split('').map((l, i) => i === 0 ? l.toUpperCase() : l.toLowerCase())}
                </div>
                <div className="result__ts">
                    {`[${state.translation[0].ts}]`}
                </div>
                <img 
                    src={audioHover ? audioIconGIF : audioIconPNG} 
                    alt="listen to word" 
                    className="result__audio" 
                    onMouseEnter={() => setAudioHover(true)}
                    onMouseLeave={() => setAudioHover(false)}
                />
            </div>
            <ResultsAccordion/>
        </div>
    )}

    return (
        <>
            {state.translation}
        </>
    )
}
 
export default Results;