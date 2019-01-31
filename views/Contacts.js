import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    console.log(1);
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );
    console.log(2);
    if (permission.status !== "granted") {
      Alert.alert("Permission was denied...");
      return;
    }

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.IMAGE]
      // pageSize: 10000,
      // pageOffset: 0
    });
    console.log(contacts);
  };

  render() {
    return (
      <View>
        <Text>hola</Text>
      </View>
    );
  }
}
