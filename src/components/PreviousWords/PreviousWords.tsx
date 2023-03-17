import { Dispatch, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../store';
import { translatePreviousWord } from '../../store/actions/appActions';
import { IAppReducer } from '../../store/reducers/appReducer';
import './PreviousWords.scss';

const PreviousWords = () => {
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    return (
        <>
            {
                state.previousWords.length 
                ? 
                    <div className="prev-words">
                        <div className="prev-words__title">
                            Previous translated words: {' '}
                        </div>
                        {state.previousWords.map((w, i) => 
                            <Fragment key= {w.value+w.from+w.to}>
                                <span 
                                    className='prev-words__word'
                                    onClick = {() => dispatchAsync(translatePreviousWord(w.value, w.from, w.to))}
                                >
                                    {w.value} ({w.from}-{w.to}){i === state.previousWords.length - 1 ? '.' : ','}
                                </span>
                                {' '}
                            </Fragment>
                        )}
                    </div>
                : 
                    null
                }
        </>
    )
}
 
export default PreviousWords;