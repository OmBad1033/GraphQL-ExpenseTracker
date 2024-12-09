import {gql} from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        getTransactions {
            _id
            description
            amount
            paymentType
            category
            location
            date
            user {
                _id
                name
                profilePicture
            }
        }
    }
`

export const GET_TRANSACTION = gql`
    query GetTransaction($id: ID!) {
        getTransaction(transactionId: $id) {
            _id
            description
            amount
            paymentType
            category
            date
            location
            user {
                _id
                name
                profilePicture
            }
        }
    }
`

export const GET_TRANSACTIONS_STATISTICS = gql`
    query GetTransactionsStatistics {
        categoryStatistics {
            category
            totalAmount
        }
    }
`