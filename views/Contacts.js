import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SectionList,
  FlatList
} from "react-native";

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contactsList: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );
    if (permission.status !== "granted") {
      Alert.alert("Permission was denied...");
      return;
    }

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.IMAGE],
      pageSize: 10000
      // pageOffset: 0
    });
    console.log("done getting contacts");
    let filteredContacts = contacts.data.filter(
      el =>
        el.hasOwnProperty("firstName") &&
        el.firstName[0] != "+" &&
        el.phoneNumbers
    );
    this.setState({
      contacts: filteredContacts
    });
    this.setState({
      contactsList: this.state.contacts.splice(0, 50).map(el => {
        return {
          title: el.name,
          data: el.phoneNumbers || []
        };
      }),
      loaded: true
    });
  };

  render() {
    let contacts;
    if (this.state.loaded) {
      console.log(this.state.contactsList);
      contacts = (
        <SectionList
          style={{ marginBottom: 12 }}
          renderItem={({ item, index, section }) => (
            <Text key={index} style={{ marginTop: 1 }}>
              {item.number}
            </Text>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold", marginTop: 12 }}>{title}</Text>
          )}
          sections={this.state.contactsList}
          keyExtractor={(item, index) => item + index}
          onEndReached={() => {
            console.log("end");
            console.log(this.state.contacts.length);
            if (this.state.contacts.length > 0) {
              this.setState({
                contactsList: [
                  ...this.state.contactsList,
                  ...this.state.contacts.splice(0, 50).map(el => {
                    return {
                      title: el.name,
                      data: el.phoneNumbers || []
                    };
                  })
                ]
              });
            }
          }}
        />
      );
    }
    return (
      <View>
        {/* <Text>hola</Text> */}

        {contacts}
      </View>
    );
  }
}
