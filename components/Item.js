import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Item extends Component {
  handlePress = () => {
    this.props.prepareItemForEditing(this.props.item);
  }
  
  render() {
    return (
      <TouchableOpacity 
        onPress={this.handlePress}
        style={styles.item}
      >
        <Text 
          style={styles.itemText}>{this.props.item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10

  },
  itemText: {
    fontSize: 20,
  }
});