import React from 'react';
import { render } from 'react-dom';

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello from react
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));
