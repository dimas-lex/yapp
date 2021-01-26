import React, { useState } from 'react';
import './styles.css';


export type FileNames = 'list' | 'list1' | 'list2' | 'list3' | 'list4' | 'list5';
 

type FileSelectorProps = {
  className?: string;
  file: FileNames;
  onSelect: (newFileName: FileNames) => void;
}

export const FileSelector = ({ className, file, onSelect }: FileSelectorProps) => {
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value as FileNames)
  }

  return ( 
    <select className={` ${className}`} value={file} onChange={onChangeHandler}>
      <option value="list">list</option> 
      <option value="list1">list1</option> 
      <option value="list2">list2</option> 
      <option value="list3">list3</option> 
      <option value="list4">list4</option> 
    </select> 
  );
}