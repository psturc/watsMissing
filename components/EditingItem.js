import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Mutation } from "react-apollo";

import { FETCH_ITEMS, DELETE_ITEM } from "./queries";

export default class EditingItem extends Component {
  deleteItem = (itemId, mutation) => {
    const { onItemDeletion } = this.props;
    mutation({
      variables: { id: itemId },
      refetchQueries: [{
        query: FETCH_ITEMS
      }]
    });
    onItemDeletion();
  }

  render() {
    const { itemToEdit } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemName}>
            {itemToEdit.name}
          </Text>
        </TouchableOpacity>
        <Mutation mutation={DELETE_ITEM}>
          {(mutation) => (
            <TouchableOpacity
              onPress={ () => { this.deleteItem(itemToEdit.id, mutation); } }
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>DELETE</Text>
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
  },
  item: {
    height: 60,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEC7",
  },
  itemName: {
    fontSize: 20,
  },
  deleteButton: {
    height: 60,
    backgroundColor: "#F73749",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButtonText: {

  }
});