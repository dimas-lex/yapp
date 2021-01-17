import React, { useState, useEffect } from 'react';
import list from './list.json';
import './Testing.css';

function getRandomArbitrary(max: number, min = 0) {
  return  Math.round(Math.random() * (max - min) + min);
}

export const Testing = () => {
  const [activeIndex, setIndex] = useState(1);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(getRandomArbitrary(list.length));
  const [formClasses, setFormClasses] = useState('');
  const [answerClasses, setAnswerClasses] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const correctAnswer = list[activeIndex]?.answer;

    if (String(answer).toLocaleLowerCase() === String(correctAnswer).toLocaleLowerCase()) {
      console.log(list.length);
      const newIndex = getRandomArbitrary(list.length);

      console.log(`newIndex ${newIndex}`);

      setIndex(newIndex);
      setStatus(1);
    } else {
      setStatus(-1);
    }
    setAnswer('');
  }

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