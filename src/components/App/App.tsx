import { useEffect, useState } from 'react';
import { translateWord, YA_DICT_API_KEY } from '../../apis/yaDict';
import './App.scss';

const App = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [currentInputValue, setCurrentInputValue] = useState('');

    useEffect(() => {
        console.log(currentWord)
    }, [currentWord])

    async function handleSend() {
        if (currentWord !== currentInputValue) {
            const response = await translateWord({key: YA_DICT_API_KEY, lang: 'ru-en', text: currentInputValue});
            setCurrentWord(response?.def[0].tr[0].text || '')
         }
    }

    return ( 
        <>
            <input type="text" value={currentInputValue} onChange={(e) => setCurrentInputValue(e.target.value)}/>
            <button onClick={handleSend}>Отправить</button>

            <div className="result">
                {currentWord}
            </div>
        </>
    );
}
 
export default App;