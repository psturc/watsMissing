import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingText: {
    backgroundColor: "#E8D5B7",
    textAlign: "center",
    fontSize: 50
  },
  container: {
    flex: 1,
    backgroundColor: "#E8D5B7",
    justifyContent: "center"
  },

});