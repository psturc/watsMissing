import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Mutation } from "react-apollo";

import {
  FETCH_ITEMS,
  UPDATE_ITEM,
  DELETE_ITEM
} from "./queries";

export default class EditingItem extends Component {

  state = {
    touchableItemStyle: styles.item
  }

  deleteItemOnDoublePress = (itemId, mutate) => {
    if (this.wasDoublePressed()) {
      const { onItemDeletion } = this.props;
      mutate({
        variables: { id: itemId },
        refetchQueries: [{
          query: FETCH_ITEMS
        }]
      });
      onItemDeletion();
    }
  };

  wasDoublePressed = () => {
    this.setState({touchableItemStyle: styles.itemPressed});
    setTimeout(() => {
      this.setState({touchableItemStyle: styles.item});
    },500);
    const time = new Date().getTime();
    const delta = time - this.lastPress;

    const DOUBLE_PRESS_DELAY = 500;
    if (delta < DOUBLE_PRESS_DELAY) {
      return true;
    }
    this.lastPress = time;
    return false;

  }

  updateItemQuantity = (item, mutate, value) => {
    const { onItemAddition } = this.props;
    const quantity = item.quantity + value < 1 ? item.quantity : item.quantity + value;
    mutate({
      variables: { name: item.name, id: item.id, quantity: quantity },
      refetchQueries: [{
        query: FETCH_ITEMS
      }]
    });
    onItemAddition();
  };

  render() {
    const { itemToEdit } = this.props;
    const { touchableItemStyle } = this.state;
    return (
      <View style={styles.wrapper}>
        <Mutation mutation={DELETE_ITEM}>
          {(mutation) => (
            <TouchableOpacity
              onPress={() => { this.deleteItemOnDoublePress(itemToEdit.id, mutation); } }
              style={touchableItemStyle}>
              <Text style={styles.itemName}>
                {itemToEdit.quantity}x {itemToEdit.name}
              </Text>
            </TouchableOpacity>
          )}
        </Mutation>
        <Mutation mutation={UPDATE_ITEM}>
          {(mutation) => (
            <TouchableOpacity
              onPress={ () => { this.updateItemQuantity(itemToEdit, mutation, 1); } }
              style={styles.incrementButton}
            >
              <Text style={styles.incrementButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </Mutation>
        <Mutation mutation={UPDATE_ITEM}>
          {(mutation) => (
            <TouchableOpacity
              onPress={ () => { this.updateItemQuantity(itemToEdit, mutation, -1); } }
              style={styles.decrementButton}
            >
              <Text style={styles.decrementButtonText}>-</Text>
            </TouchableOpacity>
          )}
        </Mutation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#ddddff44",
    borderRadius: 2,
    padding: 1
  },
  item: {
    height: 60,
    flex: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  itemPressed: {
    height: 60,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DD000044"
  },
  itemName: {
    fontSize: 20,
  },
  incrementButton: {
    height: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#00D18133",
    borderColor: "#00D18199",
    borderRadius: 0,
    marginRight: 2
  },
  incrementButtonText: {
    color: "#00D181",
    fontSize: 20
  },
  decrementButton: {
    height: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#F7374933",
    borderColor: "#F7374999",
    borderRadius: 0,
    marginRight: 2
  },
  decrementButtonText: {
    color: "#F73749",
    fontSize: 20
  }
});