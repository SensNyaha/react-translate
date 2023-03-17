import { useState } from 'react';

import audioIconGIF from './audio.gif';
import audioIconPNG from './audio.png';

import ResultsTranslatedWord from '../ResultsTranslatedWord/ResultsTranslatedWord';
import ResultsTranlatedWordTranscription from '../ResultsTranlatedWordTranscription/ResultsTranlatedWordTranscription';

import './ResultsPreview.scss'

const ResultsPreview = ({text, ts} : {text: string, ts: string | undefined}) => {
    const [audioHover, setAudioHover] = useState(false);

    return ( 
        <div className="results__preview">
            <ResultsTranslatedWord word={text}/>
            <ResultsTranlatedWordTranscription ts={ts}/>
            <img
            src={audioHover ? audioIconGIF : audioIconPNG}
            alt="listen to word"
            className="results__audio"
            onMouseEnter={() => setAudioHover(true)}
            onMouseLeave={() => setAudioHover(false)}
            />
        </div>
    );
}
 
export default ResultsPreview;

