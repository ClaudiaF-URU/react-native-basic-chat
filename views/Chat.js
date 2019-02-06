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
      users: [],
      msgs: []
    };
    this.socket = SocketIOClient("http://192.168.0.111:3001");
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Chat ${navigation.getParam('room', '').toString()}`,
    };
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
      this.setState({ msgs: [...this.state.msgs, data] })
    });
  };

  sendMsg() {
    this.socket.emit("send-msg", { text: this.state.msg });
    this.setState({ msg: "" });
  }

  render() {
    let users = '';
    let msgs = []
    for (let i = 0; i < this.state.users.length; i++) {
      users += ` ${this.state.users[i]}`
      if (i != this.state.users.length - 1) {
        users += `,`
      }
    }

    return (
      <View>
        <Text style={styles.users}>In chat: {users}</Text>
        {
          this.state.msgs.map((el, index) => (
            <Text key={index}><Text style={[el.from == this.state.user ? styles.own : styles.other]}>{el.from}: </Text><Text>{el.text}</Text> <Text style={styles.date}>{el.created}</Text></Text>
          ))
        }

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
        <Button
          title="Go Back"
          onPress={() => {
            console.log("bye");
            this.socket.disconnect();
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  users: {
    marginBottom: 20,
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20
  },
  button: {
    marginBottom: 20,
    marginTop: 20
  }, own: {
    color: 'red'
  }, other: {
    color: 'blue'
  },
  date: {
    fontSize: 12,
    color: '#c8c8c8'
  }
});
