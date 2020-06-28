import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './features/chat/chat'
import PlayArea from './features/play-area/play-area';
import Split from 'split-js';
import './universal';
import { Provider }  from 'react-redux';
import store from './store';

class TableTopApp extends React.Component {

  componentDidMount() {
    console.log('splitting')
    Split(["#map", "#chat"], {
      gutterSize: 5,
      sizes: [80,20]
    });
  }

  render() {
    return <Provider store={store}>
      <div id="wrapper" className="content">
        <PlayArea />
        <Chat />
      </div>
    </Provider>
  }
}

ReactDOM.render(
  <TableTopApp />,
  document.getElementById('root')
);
