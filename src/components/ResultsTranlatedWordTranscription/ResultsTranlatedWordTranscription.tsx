import './ResultsTranlatedWordTranscription.scss'

const ResultsTranlatedWordTranscription = ({ ts } : { ts: string | undefined }) => {
    if (ts) {
        return <div className="results__ts">
          {`[${ts}]`}
        </div>
    }
    return null
}
 
export default ResultsTranlatedWordTranscription;