import React from 'react';
import ReactDOM from 'react-dom';

class Chat extends React.Component {
    render() {
      return (
        <div id="chatIn"  className="content">
          <textarea id="chatInput"></textarea>
        </div>
      );
    }
  }

export default Chat;
