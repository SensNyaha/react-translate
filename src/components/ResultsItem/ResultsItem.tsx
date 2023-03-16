import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { TranslationWordObj } from "../../apis/yaDict";

import './ResultsItem.scss';

const ResultsItem = ({tr: {text, fr, syn}, summaryFreq} : {tr: TranslationWordObj, summaryFreq: number}) => {
    return ( <div className='results__item'>
    <div className="results__item-text">
        {text}
    </div>
    <CircularProgressbar value={+fr / summaryFreq * 100} text={`${Math.floor(+fr / summaryFreq * 100)}%`} />
    {
        syn 
        ?   
        <div className="results__item-similar">
            Похожие слова
            {syn.map(s => <div>{s.text}</div>)}
        </div>
        : null
    }
</div> );
}
 
export default ResultsItem;