import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class StatusScreen extends Component {
  render() {
    const { message } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoText: {
    backgroundColor: "#E8D5B7",
    textAlign: "center",
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#E8D5B7",
    justifyContent: "center"
  },

});