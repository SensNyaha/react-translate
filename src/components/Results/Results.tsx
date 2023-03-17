import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import './Results.scss';
import audioIconGIF from './audio.gif';
import audioIconPNG from './audio.png';
import noWord from './no-word.gif';
import ResultsAccordion from '../ResultsAccordion/ResultsAccordion';

const Results = () => {
    const [audioHover, setAudioHover] = useState(false);
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    if (typeof state.translation === 'object' && state.translation) {
        return ( 
        <div className="results">
            <div className="results__preview">
                <div className="results__word">
                    {state.translation[0].text.split('').map((l, i) => i === 0 ? l.toUpperCase() : l.toLowerCase())}
                </div>
                {state.translation[0].ts 
                ?   <div className="results__ts">
                        {`[${state.translation[0].ts}]`}
                    </div>
                :   null
                }
                <img 
                    src={audioHover ? audioIconGIF : audioIconPNG} 
                    alt="listen to word" 
                    className="results__audio" 
                    onMouseEnter={() => setAudioHover(true)}
                    onMouseLeave={() => setAudioHover(false)}
                />
            </div>
            <ResultsAccordion/>
        </div>
    )}

    return (
        <>
            <div className="results">
                <div className="results__preview">
                    {state.translation}
                </div>
                <img src={noWord} alt="not found" className="results__img" />
            </div>
        </>
    )
}
 
export default Results;