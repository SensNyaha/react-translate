import LanguagesSwitchers from '../LanguagesSwitchers/LanguagesSwitchers';
import WordInputForm from '../WordInputForm/WordInputForm';
import Results from '../Results/Results';


import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';

const App = () => {
    return ( 
        <>
            <LanguagesSwitchers/>
            <WordInputForm/>
            <Results/>
        </>
    );
}
 
export default App;