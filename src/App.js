import React from "react";
import "./App.css";
import addMsg from "./components/firebase/addMsg";
import { firestore } from "./components/firebase/firebase";
import Login from "./components/auth/login";

class App extends React.Component {
  state = {
    messages: [],
    msgToSend: "",
    btn: true,
    user: null,
  };

  componentDidMount() {
    this.updateChat();
    firestore.collection("chat").onSnapshot(this.updateChat);
  }

  updateChat = () => {
    firestore
      .collection("chat")
      .orderBy("timestamp", "asc")
      .get()
      .then((snapshot) => {
        let temp = [];
        snapshot.docs.map((doc) => {
          temp.push(doc.data());
          return 0;
        });
        this.setState({ messages: temp });
        this.setState({ btn: true });
      });
  };

  handleInputChange = (e) => {
    console.log(e.keyCode);
    if (e.nativeEvent.keyCode === 13) {
      this.addMsgHandler();
    } else {
      this.setState({ msgToSend: e.target.value });
    }
  };

  addMsgHandler = async () => {
    await this.setState({ btn: false });
    await addMsg(this.state.user.photoURL, this.state.msgToSend);
    await this.setState({ msgToSend: "" });
    await this.updateChat();
  };

  render() {
    return (
      <div className="App">
        {this.state.user === null ? (
          <Login
            onUserLogin={(userData) => this.setState({ user: userData })}
          />
        ) : (
          <div className="chat">
            <div className="chat-title">
              <h1>F3</h1>
              <h2>{this.state.user.displayName}</h2>
              <figure className="avatar">
                <img src={this.state.user.photoURL} alt="avatar" />
              </figure>
            </div>
            <div className="messages">
              <div className="messages-content">
                {this.state.messages.map((msg, index) =>
                  !(msg.user === this.state.user.photoURL) ? (
                    <div class="message">
                      <figure class="avatar">
                        <img src={msg.user} alt="avatar" />
                      </figure>
                      {msg.content}
                    </div>
                  ) : (
                    <div class="message message-personal">{msg.content}</div>
                  )
                )}
              </div>
            </div>
            <div className="message-box">
              <textarea
                type="text"
                className="message-input"
                placeholder="Type message..."
                onKeyDown={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
                value={this.state.msgToSend}
              ></textarea>
              <button
                type="submit"
                onClick={this.addMsgHandler}
                className="message-submit"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
