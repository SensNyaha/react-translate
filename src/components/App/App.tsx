import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import LanguagesSwitchers from '../LanguagesSwitchers/LanguagesSwitchers';
import WordInputForm from '../WordInputForm/WordInputForm';


import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';

const App = () => {


    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    return ( 
        <>
            <LanguagesSwitchers/>
            <WordInputForm/>

            <div className="result">
                {state.translation}
            </div>
        </>
    );
}
 
export default App;