import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import LanguagesSwitchers from '../LanguagesSwitchers/LanguagesSwitchers';
import WordInputForm from '../WordInputForm/WordInputForm';
import Results from '../Results/Results';


import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import PreviousWords from '../PreviousWords/PreviousWords';
import Loader from '../Loader/Loader';

const App = () => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;
    const scrollRef = useRef();

    useEffect(() => {
        (scrollRef.current! as HTMLDivElement).scrollTo(0,0);
    }, [state.currentInput])

    return ( 
        <>
            <SimpleBar style={{ maxHeight: 'calc(100vh - 10px)', height: '100%' }} scrollableNodeProps={{ref: scrollRef}}>
                <LanguagesSwitchers/>
                <WordInputForm/>
                <Results/>
                <PreviousWords/>
            </SimpleBar>
            <Loader/>
        </>
    );
}
 
export default App;