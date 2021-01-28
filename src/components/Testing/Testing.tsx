import React, { useState, useEffect, useCallback } from 'react';
import { FileNames } from '../FileSelector'; 
import { StatisticDetails } from './StatisticDetails';
import './Testing.css';

const files = {
  list: require('./list.json'), 
  list1: require('./list1.json'), 
  list2: require('./list2.json'), 
  list3: require('./list3.json'), 
  list4: require('./list4.json'), 
  list5: require('./list5.json'), 
}; 

type TestingProps = {
  fileName: FileNames;
};

export const Testing = ({fileName}: TestingProps) => { 
  const list = files[fileName]; 

  const [activeIndex, setIndex] = useState(1);
  const [lastHope, setLastHope] = useState(0);
  const [rightOffset, setRightOffset] = useState(30);
  const [leftOffset, setLeftOffset] = useState(0);
  const [statistic, setStatistic] = useState({} as { [key: number]: number });
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(0);
  const [formClasses, setFormClasses] = useState('');
  const [answerClasses, setAnswerClasses] = useState('');

  const getRandomArbitrary = useCallback((max: number, min = 0, level = 0): number => { 
    if (level > 4 && rightOffset < 100) {
      setRightOffset(rightOffset + 10);
      setLeftOffset(leftOffset + 10);
    }

    const newMax = Math.min(list.length -1, rightOffset);
    const newMin = Math.max(0, Math.min(leftOffset, list.length));

    const newIndex = Math.round(Math.random() * (newMax - newMin) + newMin);
    console.log(`newMax=${newMax} newMin = ${newMin} newIndex= ${newIndex} score= ${statistic[newIndex]}`);

    if (statistic[newIndex] > 3 && level < 30) {
      setLastHope(level);
      return getRandomArbitrary(max, min, level + 1);
    }

    return newIndex;
  }, [statistic, leftOffset, rightOffset, list]);


  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => { 
    event.stopPropagation();
    event.preventDefault(); 
    const correctAnswer = list[activeIndex]?.answer;

    if (String(answer).trim().toLocaleLowerCase() === String(correctAnswer).trim().toLocaleLowerCase()) {
      setStatistic({
        ...statistic,
        [activeIndex]: (statistic[activeIndex] ? statistic[activeIndex] : 0) + 1,
      });

      const newIndex = getRandomArbitrary(list.length - 1);

      setIndex(newIndex);
      setStatus(1);
    } else {
      setStatus(-1);
      setStatistic({
        ...statistic,
        [activeIndex]: (statistic[activeIndex] ? statistic[activeIndex] : 0) - 1,
      });
    }
    setAnswer('');
  }, [ activeIndex, answer, getRandomArbitrary, statistic, list])

  useEffect(() => {
    if (status === 1) setFormClasses('form--success');
    if (status === -1) {
      setFormClasses('form-error');
      setAnswerClasses('answer--show')
    }

    setTimeout(() => {
      setFormClasses('');
      setAnswerClasses('');
      setStatus(0)
    }, 3000)
  }, [status]);

  return (
    <>
      <div className="statistic">
        <StatisticDetails className="statistic__item" statistic={statistic} />
        <div className="statistic__item">part of list from:
        <input  className="statistic__item-input" value={leftOffset} onChange={(e) => setLeftOffset(parseInt(e.target.value))} /></div>

        <div className="statistic__item">to:
          <input  className="statistic__item-input" value={rightOffset} onChange={(e) => setRightOffset(parseInt(e.target.value))} />
        </div>
        <div className="statistic__item">current index: {activeIndex}</div>
        <div className="statistic__item">current score: {statistic[activeIndex] || 0}</div>
        <div className="statistic__item">hopes: {lastHope || 0}</div>
      </div>
      <form className={`form ${formClasses}`} onSubmit={onSubmit}>
        <label className="label">{list[activeIndex]?.label}</label>
        <input className="input" value={answer} onChange={(e) => setAnswer(e.target.value)} />

        <span className={`answer ${answerClasses}`}>{list[activeIndex].answer}</span>
      </form>
    </>
  );
}

