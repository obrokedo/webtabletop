import React from 'react';
import Split from 'split-js';

class Chat extends React.Component {

    componentDidMount() {
      Split(["#chatOut", "#chatIn"], {
        direction: 'vertical',
        gutterSize: 5,
        sizes: [80,20]
      });
    }

    render() {
      return (
        <div id="chat">
          <div id="chatOut"  className="content">
            <div>
              <div id="menu" style={{"width": "100%"}}>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary" id="buttonChat">Chat</button>
                  <button type="button" className="btn btn-secondary" id="buttonImages">Images</button>
                  <button type="button" className="btn btn-secondary">Maps</button>
                  <button type="button" className="btn btn-secondary">Music</button>
                  <button type="button" className="btn btn-secondary">Documents</button>
                  <button type="button" className="btn btn-secondary">Settings</button>
                </div>
              </div>
              <div style={{"width": "100%"}}>
                "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
              </div>
            </div>
          </div>
          <div id="chatIn"  className="content">
            <textarea id="chatInput"></textarea>
          </div>
      </div>
      );
    }
  }

export default Chat;
