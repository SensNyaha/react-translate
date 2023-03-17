import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import './ResultsTooltip.scss'

const ResultsTooltip = () => {
    return ( <>
        <svg className='results__info-svg' viewBox="0 0 80 80" data-tooltip-id="info-tooltip" data-tooltip-place="bottom">
            <path
            fill="#75c4f1"
            d="M40,77.5C19.322,77.5,2.5,60.678,2.5,40S19.322,2.5,40,2.5S77.5,19.322,77.5,40S60.678,77.5,40,77.5 z"
            />
            <path
            fill="#75c4f1"
            d="M40,3c20.402,0,37,16.598,37,37S60.402,77,40,77S3,60.402,3,40S19.598,3,40,3 M40,2 C19.013,2,2,19.013,2,40s17.013,38,38,38s38-17.013,38-38S60.987,2,40,2L40,2z"
            />
            <path fill="#fff" d="M40 21A3 3 0 1 0 40 27A3 3 0 1 0 40 21Z" />
            <g>
            <path
                fill="#fff"
                d="M43 56L43 31 35 31 35 33 37 33 37 56 35 56 35 58 45 58 45 56z"
            />
            </g>
        </svg>
        <Tooltip id="info-tooltip" style={{zIndex: '999999'}}> 
            <div className="results__info-text--desktop">
                Press RMB on translation words to open sub-menu
            </div>
            <div className="results__info-text--touch">
                Hold translation word to open sub-menu
            </div>
        </Tooltip>
    </> 
    );
}
 
export default ResultsTooltip;