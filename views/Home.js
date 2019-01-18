import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import SocketIOClient from "socket.io-client";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: ""
    };

    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient("http://192.168.1.110:3001");
    this.socket.emit("open-chat", {
      nickname: "claudia",
      room: 1
    });

    this.socket.on('message', (message) => {
      console.log('msg',message);
      // var oldMessages = this.state.messages;
      // // React will automatically rerender the component when a new message is added.
      // this.setState({ messages: oldMessages.concat(message) });
    });
  }

  sendMsg() {
    // console.log(this.state.msg);
    this.socket.emit("send-msg", { text: this.state.msg });
    this.setState({ msg: "" });
  }

  

  render() {
    return (
      <View>
        <Text>Chat example with socket.io</Text>
        <TextInput
          onChangeText={msg => this.setState({ msg })}
          value={this.state.msg}
        />
        <Button
          title="Send"
          onPress={() => {
            this.sendMsg();
          }}
        />
      </View>
    );
  }
}
