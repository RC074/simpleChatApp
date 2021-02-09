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
    if (e.key === "Enter") {
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
          // <div className="container">
          //   <ul className="MsgWrapper">
          //     {this.state.messages.length === 0
          //       ? "No messages"
          //       : this.state.messages.map((msg, index) => (
          //           <li
          //             key={index}
          //             className={
          //               msg.user === this.state.user ? "right" : "left"
          //             }
          //           >
          //             {msg.user === this.state.user ? (
          //               <div className="MsgContainer">
          //                 <img src={msg.user} alt="avatar"></img>
          //                 <div className="Msg">{msg.content}</div>
          //               </div>
          //             ) : (
          //               <div className="MsgContainer">
          //                 <img src={msg.user} alt="avatar"></img>
          //                 <div className="Msg">{msg.content}</div>
          //               </div>
          //             )}
          //           </li>
          //         ))}
          //   </ul>
          //   <div className="inputContainer">
          //     <input
          //       onChange={(e) => this.setState({ msgToSend: e.target.value })}
          //       value={this.state.msgToSend}
          //     ></input>
          //     <button onClick={this.addMsgHandler}>Click</button>
          //   </div>
          // </div>
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
        {/* <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div> */}
      </div>
    );
  }
}

export default App;
