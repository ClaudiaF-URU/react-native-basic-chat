import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./views/Home";
import Contacts from "./views/Contacts";
import Chat from "./views/Chat";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: Home,
    Contacts: Contacts,
    Chat: Chat
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);
