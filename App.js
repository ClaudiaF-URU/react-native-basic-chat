import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./views/Home";
import Contacts from "./views/Contacts";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Contacts />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40
  }
});
