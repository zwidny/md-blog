import React from 'react';
import ReactDOM from 'react-dom';


class APP extends React.Component {
  render() {
    return (
      <div>Hello world</div>
    )
  }
}

// --------------------  app  --------------------------

ReactDOM.render(
  <APP/>,
  document.getElementById('root')
);