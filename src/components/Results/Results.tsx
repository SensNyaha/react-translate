import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import './Results.scss';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Results = () => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    return ( 
        <div className="result">
            {typeof state.translation === 'object' && state.translation 
            ? state.translation.map(t => t.tr.map(tr => (
                <>
                    {tr.text}
                    <CircularProgressbar value={+tr.fr * 10} text={`${tr.fr}`} />
                </>
                // <div>{tr.text}</div>
            ))) 
            : state?.translation}
        </div>
    );
}
 
export default Results;