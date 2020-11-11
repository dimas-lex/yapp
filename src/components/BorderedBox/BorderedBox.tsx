import React, { Component } from 'react';

export interface IBorderBox extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
}

export class BorderedBox extends Component<IBorderBox, {}> {

  public render() {
    const {children, title, ...divAttributes } = this.props;

    return (
      <div {...divAttributes} style={{border: "1px solid red"}}>
        <h1>{title}</h1>
        {children}
      </div>
    );
  }
}