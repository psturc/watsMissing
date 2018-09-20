import React, { Component } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Mutation } from "react-apollo";
import { ADD_ITEM, FETCH_ITEMS } from "./queries";

export default class ItemAddButton extends Component {

  addNewItem = (itemName, cb) => {
    cb({
      variables: { name: itemName },
      refetchQueries: [{
        query: FETCH_ITEMS
      }]
    });
  }

  render() {
    return (
      <Mutation mutation={ADD_ITEM}>
        {(mutation) => (
          <View style={styles.buttonWrapper}>
            <Button title='Add new Item' onPress={() => this.addNewItem(this.props.itemName, mutation)}/>
          </View>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    
  }  
});