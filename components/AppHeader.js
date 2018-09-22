import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class AppHeader extends Component {
  
  render() {
    const { networkProblems } = this.props;

    if (networkProblems) {
      this.headerText = "Detected Network Connection Issues";
      this.headerStyle = styles.headerWarning;
    } else {
      this.headerText = "WATS MISSING?";
      this.headerStyle = styles.header;
    }
    return (
      <View style={this.headerStyle}>
        <Text style={styles.headerText}>{this.headerText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    backgroundColor: "#4282d7"
  },
  headerWarning: {
    paddingTop: 20,
    backgroundColor: "#FAC54B"
  },
  headerText: {
    textAlign: "center",
    fontSize: 30,
  }
});