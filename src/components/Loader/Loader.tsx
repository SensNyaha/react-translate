import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import './Loader.scss'

const Loader = () => {
  const state = useSelector((state: IAppReducer) => state) as IAppReducer;

  if (state.loading) {
    return (
      <div className="loader">
        <svg
          className='loader__svg'
          width="131px"
          height="131px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <circle cx="60" cy="50" r="4" fill="#37fc89">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.36101083032490977s"
                values="95;35"
                keyTimes="0;1"
                begin="-0.9141s"
              ></animate>
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.36101083032490977s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="-0.9141s"
              ></animate>
            </circle>
            <circle cx="60" cy="50" r="4" fill="#37fc89">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.36101083032490977s"
                values="95;35"
                keyTimes="0;1"
                begin="0s"
              ></animate>
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.36101083032490977s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="0s"
              ></animate>
            </circle>
          </g>
          <g transform="translate(-15 0)">
            <path
              d="M50 50L20 50A30 30 0 0 0 80 50Z"
              fill="#333"
              transform="rotate(90 50 50)"
            ></path>
            <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#333">
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.36101083032490977s"
                values="0 50 50;45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              ></animateTransform>
            </path>
            <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#333">
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.36101083032490977s"
                values="0 50 50;-45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              ></animateTransform>
            </path>
          </g>
        </svg>
      </div>
    );
  }
  return null;
}
 
export default Loader;