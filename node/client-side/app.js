import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './features/chat/chat'

class TableTopApp extends React.Component {
  render() {
    return <div id="app">
      <div className="play-area"></div>
      <Chat />
    </div>
  }
}

ReactDOM.render(
  <TableTopApp />,
  document.getElementById('root')
);
