import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import SocketIOClient from "socket.io-client";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      room: 0,
      msg: "",
      users: []
    };
    this.socket = SocketIOClient("http://192.168.1.110:3001");
  }

  static navigationOptions = {
    title: `Chat` // ${this.state.room}`
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    await this.setState({ user: navigation.getParam("user", {}) });
    await this.setState({ room: navigation.getParam("room", {}) });

    this.socket.emit("open-chat", {
      nickname: this.state.user,
      room: this.state.room
    });

    this.socket.on("in-chat", data => {
      console.log(data);
      this.setState({ users: data.users });
    });

    this.socket.on("message", data => {
      console.log(data);
    });
  };

  componentWillUnmount() {
    console.log("bye");
    this.socket.disconnect();
  }

  sendMsg() {
    this.socket.emit("send-msg", { text: this.state.msg });
    this.setState({ msg: "" });
  }

  render() {
    let users = [];
    for (let i = 0; i < this.state.users.length; i++) {
      users.push(<Text key={i}>{this.state.users[i]}</Text>);
    }
    return (
      <View>
        {users}

        <TextInput
          style={styles.input}
          placeholder="msg"
          onChangeText={msg => this.setState({ msg })}
          value={this.state.msg}
        />
        <View style={styles.button}>
          <Button
            title="Send"
            onPress={() => {
              this.sendMsg();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20
  },
  button: {
    marginBottom: 20,
    marginTop: 20
  }
});
