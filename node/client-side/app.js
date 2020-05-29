import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './features/chat/chat'
import PlayArea from './features/play-area/play-area';
import Split from 'split-js';
import './universal';

class TableTopApp extends React.Component {

  componentDidMount() {
    console.log('splitting')
    Split(["#map", "#chat"], {
      gutterSize: 5,
      sizes: [80,20]
    });
  }

  render() {
    return <div id="wrapper" className="content">
      <PlayArea />
      <Chat />
    </div>
  }
}

ReactDOM.render(
  <TableTopApp />,
  document.getElementById('root')
);
