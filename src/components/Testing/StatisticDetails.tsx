import React from 'react';
import './Testing.css';

export const StatisticDetails = ({ className, statistic }: { className: string; statistic: { [key: number]: number } }) => {
  const keys = Object.keys(statistic);
  return (
    <>
      <div className={`statistic-details ${className || ''}`}>
        {
          keys.map( (index) => {
            return (
              <div className="details__wrap" key={index}>
                <span className="details__item">
                  {index}
                </span>
                <span className="details__item">
                  {statistic[parseInt(index)]}
                </span>
              </div>
            );
          })
        } 
      </div> 
    </>
  );
}