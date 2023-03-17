import { useState } from 'react';

import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import { makeRequestToVoiceRSSAndPlay } from '../../apis/textToSpeech';

import audioIconGIF from './audio.gif';
import audioIconPNG from './audio.png';

import ResultsTranslatedWord from '../ResultsTranslatedWord/ResultsTranslatedWord';
import ResultsTranlatedWordTranscription from '../ResultsTranlatedWordTranscription/ResultsTranlatedWordTranscription';

import './ResultsPreview.scss'

const ResultsPreview = ({text, ts} : {text: string, ts: string | undefined}) => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    const [audioHover, setAudioHover] = useState(false);

    function callVoiceAPI () {
        if (typeof state.translation === 'object' && state.translation) {
            makeRequestToVoiceRSSAndPlay(state.translation[0].text, state.translatedFrom)
        }
    }

    return ( 
        <div className="results__preview">
            <ResultsTranslatedWord word={text}/>
            <ResultsTranlatedWordTranscription ts={ts}
        />
            <img
                src={audioHover ? audioIconGIF : audioIconPNG}
                alt="listen to word"
                className="results__audio"
                onMouseEnter={() => setAudioHover(true)}
                onMouseLeave={() => setAudioHover(false)}
                onClick={callVoiceAPI}
            />
        </div>
    );
}
 
export default ResultsPreview;

