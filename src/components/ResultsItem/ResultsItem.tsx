import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { TranslationWordObj } from "../../apis/yaDict";

import './ResultsItem.scss';

import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';
import { useSelector } from "react-redux";
import { IAppReducer } from "../../store/reducers/appReducer";

const ResultsItem = ({tr: {text, fr, syn}, summaryFreq} : {tr: TranslationWordObj, summaryFreq: number}) => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;
    
    return ( <div className='results__item'>
        <ContextMenuTrigger id="main-result">
            <div className="results__item-text">
                {text}
            </div>
        </ContextMenuTrigger>
        <ContextMenu 
            id="main-result"
            hideOnLeave={true}    
        >
            <ContextMenuItem>
                <span className="results__context">
                    Translate this word to {
                        state.fromLangs?.find(l => l[0] === state.fromLanguage)?.[1].toLowerCase()
                    }
                </span>
            </ContextMenuItem>
        </ContextMenu>
        <CircularProgressbar value={+fr / summaryFreq * 100} text={`${Math.floor(+fr / summaryFreq * 100)}%`} />
        {
            syn 
            ?   
            <div className="results__item-similar">
                Похожие слова:
                {syn.map((s, i) => {
                    const prefix = i === 0 ? ' ' : '';
                    const postfix = i === syn.length - 1 ? '.' : ', ';

                    return <span key={s.text}>{prefix + s.text + postfix}</span>
                })}
            </div>
            : null
        }
    </div> 
    );
}
 
export default ResultsItem;