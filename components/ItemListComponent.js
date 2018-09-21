import React, { Component } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

import Item from "./Item";
import ItemAddButton from "./ItemAddButton";

import EditingItem from "./EditingItem";

export default class ItemListComponent extends Component {

  constructor(props) {
    super(props);
    const { fetchedData } = this.props;

    this.state = {
      newItemText: "",
      itemToEdit: null,
      fetchedData
    };
  }

  componentDidUpdate(prevProps) {
    const { fetchedData } = this.props;
    if (fetchedData.length !== prevProps.fetchedData.length) {
      this.setState({ fetchedData: fetchedData });
    }
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
    const { fetchedData, newItemText, itemToEdit } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerText}>WATS MISSING?</Text>
        </View>
        <TextInput
          style={styles.newItemInput}
          onChangeText={this.handleNewItemTextChange}
          value={newItemText}
          placeholder="Enter item name"
          underlineColorAndroid="transparent"
        />
        <ItemAddButton
          itemName={newItemText}
          onItemAddition={this.onItemAddition}
        />
        {
          itemToEdit ?
            <EditingItem
              onItemDeletion={this.onItemDeletion}
              itemToEdit={itemToEdit}
            /> : null
        }
        <FlatList
          data={fetchedData}
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
  header: {
    paddingTop: 20,
    backgroundColor: "#4282d7"
  },
  headerText: {
    textAlign: "center",
    fontSize: 30,
  },
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