import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-apollo";

import StatusScreen from "./StatusScreen";
import ItemListComponent from "./ItemListComponent";
import { FETCH_ITEMS } from "./queries";

export default class ItemListWrapper extends Component {

  offlineData = null;
  
  render() {
    return (
      <View style={styles.container}>
        <Query query={FETCH_ITEMS} pollInterval={5000}>
          {({ loading, error, data }) => {
            if (loading) {
              return <StatusScreen message='Loading'/>;
            }
            if (!error) {
              this.offlineData = data.allItems;
              return <ItemListComponent fetchedItems={this.offlineData}/>;
            }
            if (this.offlineData) {
              return <ItemListComponent fetchedItems={this.offlineData} networkProblems={true}/>;
            }
            return <StatusScreen message={error.message}/>;
            
          }}
        </Query>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});