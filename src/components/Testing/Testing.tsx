import React, { useState, useEffect, useCallback } from 'react';
import list from './list.json';
import './Testing.css';
 
export const Testing = () => {
  const [activeIndex, setIndex] = useState(1);
  const [statistic, setStatistic] = useState({} as { [key: number]: number });
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(0);
  const [formClasses, setFormClasses] = useState('');
  const [answerClasses, setAnswerClasses] = useState('');

  const getRandomArbitrary = useCallback((max: number, min = 0, level = 0): number => { 
    const newIndex = Math.round(Math.random() * (max - min) + min);
    console.log(`newIndex=${newIndex} statistic[newIndex] = ${statistic[newIndex]}`, statistic)
    if (statistic[newIndex] > 5 && level < 20) {
      console.log('try new', level)
      return getRandomArbitrary(max, min, level + 1);
    }
  
    return newIndex;
  },[statistic]);


  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault(); 
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
      setStatus(-1);   setStatistic({
        ...statistic,
        [activeIndex]: (statistic[activeIndex] ? statistic[activeIndex] : 0) - 1,
      });
    }
    setAnswer('');
  }, [list, activeIndex, answer, getRandomArbitrary, statistic])

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
    <form className={`form ${formClasses}`} onSubmit={onSubmit}>
      <label className="label">{list[activeIndex]?.label}</label>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} />

      <span className={`answer ${answerClasses}`}>{list[activeIndex].answer}</span>
    </form>
  );
}