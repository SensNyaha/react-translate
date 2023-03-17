const ResultsTranslatedWord = ({ word } : {word: string}) => {
    return ( 
    <div className="results__word">
    {
        word.split("")
        .map((l, i) => (i === 0 ? l.toUpperCase() : l.toLowerCase()))
    }
    </div>
    );
}
 
export default ResultsTranslatedWord;