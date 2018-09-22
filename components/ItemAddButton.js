import React, { Component } from "react";
import { Button, View } from "react-native";
import { Mutation } from "react-apollo";
import { ADD_ITEM, UPDATE_ITEM, FETCH_ITEMS } from "./queries";

export default class ItemAddButton extends Component {

  addNewItem = (itemName, mutate) => {
    const { onItemAddition } = this.props;
    if (itemName) {
      mutate({
        variables: { name: itemName },
        refetchQueries: [{
          query: FETCH_ITEMS
        }]
      });
      onItemAddition();
    }
  };

  updateItem = (item, mutate) => {
    const { onItemAddition } = this.props;
    mutate({
      variables: { name: item.name, id: item.id, quantity: item.quantity + 1 },
      refetchQueries: [{
        query: FETCH_ITEMS
      }]
    });
    onItemAddition();
  };

  itemNameExists = (items, searchedItemName) => {
    return items.find((item) => item.name === searchedItemName);
  }

  render() {
    const { itemName, fetchedItems } = this.props;
    const itemToUpdate = this.itemNameExists(fetchedItems, itemName);

    return (
      itemToUpdate ?
        <Mutation mutation={UPDATE_ITEM}>
          {(mutate) => (
            <View>
              <Button title='Update Item' onPress={() => this.updateItem(itemToUpdate, mutate)}/>
            </View>
          )}
        </Mutation> :
        <Mutation mutation={ADD_ITEM}>
          {(mutate) => (
            <View>
              <Button title='Add new Item' onPress={() => this.addNewItem(itemName, mutate)}/>
            </View>
          )}
        </Mutation>
    );
  }
}