import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
// import SocketIOClient from "socket.io-client";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Chat example with socket.io</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <View style={styles.button}>
          <Button
            title={"Join chat 1 as " + this.state.username}
            onPress={() => {
              this.props.navigation.navigate("Chat", {
                user: this.state.username,
                room: 1
              });
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={"Join chat 2 as " + this.state.username}
            onPress={() => {
              this.props.navigation.navigate("Chat", {
                user: this.state.username,
                room: 2
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25
  },
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
