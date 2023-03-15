import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import './Results.scss';
import audioIconGIF from './audio.gif';
import audioIconPNG from './audio.png';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Accordion, AccordionItem } from '@szhsin/react-accordion';

const Results = () => {
    const [audioHover, setAudioHover] = useState(false);
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    if (typeof state.translation === 'object' && state.translation) {
        return ( 
        <div className="result">
            <div className="result__preview">
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
            { state.translation.map(t => {
                const summaryFreq = t.tr.reduce((sum, cur) => sum += cur.fr, 0)
                return (
                    <Accordion>
                        <AccordionItem header={t.pos}>
                            {t.tr.map(tr => (
                                <div className='result__item'>
                                    <div className="result__item-text">
                                        {tr.text}
                                    </div>
                                    <CircularProgressbar value={+tr.fr / summaryFreq * 100} text={`${Math.floor(+tr.fr / summaryFreq * 100)}%`} />
                                </div>
                            ))}
                        </AccordionItem>
                    </Accordion>
                )
            })}
        </div>
    )}

    return (
        <>
            {state.translation}
        </>
    )
}
 
export default Results;