import { useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';

import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';

import './ResultsAccordion.scss';
import ResultsItem from '../ResultsItem/ResultsItem';
import React from 'react';

const AccordionItem = ({ header, ...rest } : {[key: string]: React.ReactNode}) => (
    <Item
      {...rest}
      header={
        <>
          {header}
          <svg height="25" width="25" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="chevron"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </>
      }
    />
  );


const ResultsAccordion = () => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;
    
    return ( 
        <Accordion transition transitionTimeout={200}>
            { Array.isArray(state.translation) && state.translation.map((t, i) => {
                const summaryFreq = t.tr.reduce((sum, cur) => sum += cur.fr, 0);
                return (
                        <AccordionItem header={t.pos} key={'accordion' + Math.random()} initialEntered={i === 0}>
                            {t.tr.map(tr => (
                                <ResultsItem tr={tr} summaryFreq={summaryFreq} key={'result' + Math.random()}/>
                            ))}
                        </AccordionItem>
                )
            })}
        </Accordion>
     );
}
 
export default React.memo(ResultsAccordion);