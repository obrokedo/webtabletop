import React from 'react';
import Split from 'split-js';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMessages, postMessage } from '../../actions/chatActions'

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: 'Roberto',
        email: 'r.oberto@check-it.com'
      },
      currentMessage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchMessages();
    Split(["#chatOut", "#chatIn"], {
      direction: 'vertical',
      gutterSize: 5,
      sizes: [80,20]
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const submittedMessage = this.state.currentMessage;
    const newMessage = {
      id: Date.now(),
      body: submittedMessage,
      email: this.state.currentUser.email
    };
    this.props.postMessage(newMessage);
    this.setState({
      currentMessage: ''
    });
  }

  onChange(e) {
    this.setState({currentMessage: e.target.value});
  }

  render() {
    const displayMessages = this.props.messages.map( message => (
      <div key={message.id}>
        <label>{message.email}:</label>
        <p>{message.body}</p>
      </div>
    ));

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
           <div>{displayMessages}</div>
          </div>
        </div>
        <form id="chatIn"  className="content" onSubmit={this.onSubmit}>
          <textarea id="chatInput" onChange={this.onChange} name="messageText" value={this.state.currentMessage}></textarea>
          <button type="submit" htmlFor="chatIn">Submit</button>
        </form>
    </div>
    );
  }
}

Chat.propTypes = {
  fetchMessages: propTypes.func.isRequired,
  postMessage: propTypes.func.isRequired,
  messages: propTypes.array.isRequired
}

const mapStateToProps = state => ({
  messages: state.chatData.messages
});

export default connect(mapStateToProps, { fetchMessages, postMessage })(Chat);
