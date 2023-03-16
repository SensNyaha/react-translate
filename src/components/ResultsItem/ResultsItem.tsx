import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { TranslationWordObj } from "../../apis/yaDict";

import './ResultsItem.scss';

import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';
import { useSelector } from "react-redux";
import { IAppReducer } from "../../store/reducers/appReducer";
import { translateResultedWord } from "../../store/actions/appActions";
import { store } from "../../store";
import { Dispatch } from "react";

const ResultsItem = ({tr: {text, fr, syn}, summaryFreq} : {tr: TranslationWordObj, summaryFreq: number}) => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    
    return ( <div className='results__item'>
        <ContextMenuTrigger id={`main-result-${text}`}>
            <div className="results__item-text">
                {text}
            </div>
        </ContextMenuTrigger>
        <ContextMenu 
            id={`main-result-${text}`}
            hideOnLeave={true}    
        >
            <ContextMenuItem >
                <div
                    onClick={() => dispatchAsync(translateResultedWord(text))}
                    className="results__context"
                >
                    Translate this word to {
                        state.fromLangs?.find(l => l[0] === state.fromLanguage)?.[1].toLowerCase()
                    }
                </div>
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