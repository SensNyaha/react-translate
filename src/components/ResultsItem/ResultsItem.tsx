import { Dispatch } from "react";

import { useSelector } from "react-redux";

import { TranslationWordObj } from "../../apis/yaDict";

import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { store } from "../../store";
import { IAppReducer } from "../../store/reducers/appReducer";
import { translateResultedWord } from "../../store/actions/appActions";

import './ResultsItem.scss';
import WithContextMenu from "../WithContextMenu/WithContextMenu";

const ResultsItem = ({tr: {text, fr, syn}, summaryFreq} : {tr: TranslationWordObj, summaryFreq: number}) => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>;
    
    return ( <div className='results__item'>
        <WithContextMenu 
            triggerText={text} 
            triggerClass='results__item-text' 
            menuItems={
                [
                    {
                        itemClass: 'results__context',
                        itemText: `Translate this word to ${state.fromLangs?.find(l => l[0] === state.translatedFrom)?.[1].toLowerCase()}`,
                        itemOnClickF: () => dispatchAsync(translateResultedWord(text))
                    }
                ]
            }
        />
        <CircularProgressbar value={+fr / summaryFreq * 100} text={`${Math.floor(+fr / summaryFreq * 100)}%`} />
        
        { syn ?   
            <div className="results__item-similar">
                Similars:
                {syn.map((s, i) => {
                    const prefix = i === 0 ? ' ' : '';
                    const postfix = i === syn.length - 1 ? '.' : ', ';

                    return <span key={s.text}>{
                        <WithContextMenu 
                            triggerText={prefix + s.text + postfix}
                            triggerClass="results__item-similar-text"
                            menuItems={
                                [
                                    {
                                        itemClass: 'results__context',
                                        itemText: `Translate this word to ${state.fromLangs?.find(l => l[0] === state.translatedFrom)?.[1].toLowerCase()}`,
                                        itemOnClickF: () => dispatchAsync(translateResultedWord(s.text))
                                    }
                                ]
                            }
                        />
                    }</span>
                })}
            </div> :
            null }
    </div> 
    );
}
 
export default ResultsItem;