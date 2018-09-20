import React, { Component } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Query } from "react-apollo";
import Item from "./Item";
import ItemAddButton from "./ItemAddButton";
import LoadingScreen from "./LoadingScreen";
import EditingItem from "./EditingItem";

import { FETCH_ITEMS } from "./queries";

export default class ItemListComponent extends Component {

  state = {
    newItemText: "",
    itemNameToEdit: null
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

  render() {
    return (
      <Query query={FETCH_ITEMS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingScreen/>;
          }
          if (error) {
            return error.message;
          }

          return (
            <View style={styles.wrapper}>
              <View style={styles.header}>
                <Text style={styles.headerText}>WATS MISSING?</Text>
              </View>
              <TextInput
                style={styles.newItemInput}
                onChangeText={this.handleNewItemTextChange}
                value={this.state.newItemText}
                placeholder="Enter item name"
                underlineColorAndroid="transparent"
              />
              <ItemAddButton itemName={this.state.newItemText}/>
              {
                this.state.itemToEdit ?
                  <EditingItem onItemDeletion={this.onItemDeletion} itemToEdit={this.state.itemToEdit}/> :
                  null
              }
              <FlatList
                data={data.allItems}
                keyExtractor={(item) => item.id}
                renderItem={({item}) =>
                  <Item
                    key={item.id}
                    onItemPressed={() => {}}
                    item={item}
                    prepareItemForEditing={this.prepareItemForEditing}
                  />}
              />
            </View>
          );
        }}
      </Query>
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