import LanguagesSwitchers from '../LanguagesSwitchers/LanguagesSwitchers';
import WordInputForm from '../WordInputForm/WordInputForm';
import Results from '../Results/Results';


import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const App = () => {
    return ( 
        <SimpleBar style={{ maxHeight: 'calc(100vh - 10px)' }}>
            <LanguagesSwitchers/>
            <WordInputForm/>
            <Results/>
        </SimpleBar>
    );
}
 
export default App;