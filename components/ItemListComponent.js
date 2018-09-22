import React, { Component } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

import Item from "./Item";
import ItemAddButton from "./ItemAddButton";

import EditingItem from "./EditingItem";
import AppHeader from "./AppHeader";

export default class ItemListComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newItemText: "",
      itemToEdit: null,
    };
  }

  componentDidUpdate() {
    const { itemToEdit } = this.state;
    const { fetchedItems } = this.props;

    if (itemToEdit) {
      const changedItem = fetchedItems.find((item) => 
        item.id === itemToEdit.id && item.quantity !== itemToEdit.quantity
      );
      if (changedItem) {
        this.setState({ itemToEdit: changedItem });
      }
    }
  }

  selectedItemDidChange = () => {

  }

  handleNewItemTextChange = (newItemText) => {
    this.setState({
      newItemText
    });
  }

  prepareItemForEditing = (item) => {
    this.setState({
      itemToEdit: item
    });
  }

  onItemDeletion = () => {
    this.setState({
      itemToEdit: null
    });
  }

  onItemAddition = () => {
    this.setState({
      newItemText: null
    });
  }

  render() {
    const { newItemText, itemToEdit } = this.state;
    const { fetchedItems, networkProblems } = this.props;
    return (
      <View style={styles.wrapper}>
        <AppHeader networkProblems={networkProblems}/>
        <TextInput
          style={styles.newItemInput}
          onChangeText={this.handleNewItemTextChange}
          value={newItemText}
          placeholder="Enter item name"
          underlineColorAndroid="transparent"
        />
        <ItemAddButton
          itemName={newItemText}
          fetchedItems={fetchedItems}
          onItemAddition={this.onItemAddition}
        />
        {
          itemToEdit ?
            <EditingItem
              onItemDeletion={this.onItemDeletion}
              onItemAddition={this.onItemAddition}
              itemToEdit={itemToEdit}
            /> : null
        }
        <FlatList
          data={fetchedItems}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <Item
              key={item.id}
              onItemPressed={() => {}}
              item={item}
              prepareItemForEditing={this.prepareItemForEditing}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newItemInput: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    padding: 5
  },
  wrapper: {
    flex: 1,
  }
});