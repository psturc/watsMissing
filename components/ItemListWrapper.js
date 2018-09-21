import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Query } from "react-apollo";

import LoadingScreen from "./LoadingScreen";
import ItemListComponent from "./ItemListComponent";
import { FETCH_ITEMS } from "./queries";

export default class ItemListWrapper extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Query query={FETCH_ITEMS} pollInterval={5000}>
          {({ loading, error, data }) => {
            if (loading) {
              return <LoadingScreen/>;
            }
            if (error) {
              return <Text>error.message</Text>;
            }
            return <ItemListComponent fetchedData={data.allItems}/>;
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