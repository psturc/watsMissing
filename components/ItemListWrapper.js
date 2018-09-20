import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import ItemListComponent from "./ItemListComponent";


export default class ItemListWrapper extends Component {

  createItem = () => {
    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ItemListComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});