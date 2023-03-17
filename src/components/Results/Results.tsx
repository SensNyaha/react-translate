import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import './Results.scss';

import noWord from './no-word.gif';

import ResultsAccordion from '../ResultsAccordion/ResultsAccordion';
import ResultsPreview from '../ResultsPreview/ResultsPreview';
import ResultsTooltip from '../ResultsTooltip/ResultsTooltip';

const Results = () => {

    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    if (typeof state.translation === 'object' && state.translation) {
        return (
          <div className="results">
            <ResultsPreview text={state.translation[0].text} ts={state.translation[0].ts}/>
            <ResultsTooltip/>
            <ResultsAccordion />
          </div>
        );}

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