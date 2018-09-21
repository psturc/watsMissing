import gql from "graphql-tag";

const FETCH_ITEMS = gql`
    query fetch_items {
        allItems {
            name
            quantity
            id
        }
    }
`;

const ADD_ITEM = gql`
    mutation add_item($name: String!) {
        createItem(name: $name, quantity: 1) {
            name
            quantity
        }
    }
`;

const DELETE_ITEM = gql`
    mutation delete_item($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;

const SUBSCRIBE = gql`
    subscription subscribe {
        Item {
            node {
                id
                name
                quantity
            }
        }
    }
`;

export { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM, SUBSCRIBE };