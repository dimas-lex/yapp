import React, { useState, useEffect, useCallback } from 'react';
import list from './list.json';
import { StatisticDetails } from './StatisticDetails';
import './Testing.css';

console.log('testing')
export const Testing = () => {
  const [activeIndex, setIndex] = useState(1);
  const [lastHope, setLastHope] = useState(0);
  const [rightOffset, setRightOffset] = useState(30);
  const [leftOffset, setLeftOffset] = useState(1);
  const [statistic, setStatistic] = useState({} as { [key: number]: number });
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(0);
  const [formClasses, setFormClasses] = useState('');
  const [answerClasses, setAnswerClasses] = useState('');

  const getRandomArbitrary = useCallback((max: number, min = 0, level = 0): number => { 
    if (level > 10 && rightOffset < 100) {
      setRightOffset(rightOffset + 10);
      setLeftOffset(leftOffset + 10);
    }
    const newMax = max * (Math.min(100, rightOffset)) / 100;
    const newMin = max * (Math.max(1, leftOffset)) / 100;

    const newIndex = Math.round(Math.random() * (newMax - newMin) + newMin);
    console.log(`newMax=${newMax} newMin = ${newMin} newIndex= ${newIndex} score= ${statistic[newIndex]}`);

    if (statistic[newIndex] > 5 && level < 30) {
      setLastHope(level);
      return getRandomArbitrary(max, min, level + 1);
    }

    return newIndex;
  }, [statistic, leftOffset, rightOffset]);


  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {

    event.stopPropagation();
    event.preventDefault();
    console.log('==========')
    const correctAnswer = list[activeIndex]?.answer;

    if (String(answer).toLocaleLowerCase() === String(correctAnswer).toLocaleLowerCase()) {
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
  }, [ activeIndex, answer, getRandomArbitrary, statistic])

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
    }, 2000)
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

