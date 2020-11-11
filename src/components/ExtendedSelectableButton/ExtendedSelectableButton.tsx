import React, { useState } from 'react'; 
 
export enum SelectableButtonTypes {
    Important = "important",
    Optional = "optional",
    Irrelevant = "irrelevant"
}

interface IButtonProps {
    text: string,
    type: SelectableButtonTypes,
    action: (selected: boolean) => void,
}


export const ExtendedSelectableButton = ({text, type, action }: IButtonProps) => {

    let [selected, setSelected]  = useState<Boolean>(false)

    return (<button className={"extendedSelectableButton " + type + (selected? " selected" : "")}
     onClick={ _ => {
        setSelected(!selected)
        action(!!selected)
    }}>{text}</button>)
};

export default ExtendedSelectableButton;