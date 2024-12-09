const transactionTypeDefs = `#graphql
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        amount: Float!
        paymentType: String!
        category: String!
        date: String!
        location: String!
        user: User!
    }

    type Query {
        getTransactions: [Transaction!]
        getTransaction(transactionId: ID!): Transaction
        categoryStatistics: [CategoryStatistics!]
    }   

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    type CategoryStatistics {
        category: String!
        totalAmount: Float!
    }

    input CreateTransactionInput {
        description: String!
        amount: Float!
        paymentType: String!
        category: String!
        date: String!
        location: String!
    }

    input UpdateTransactionInput {
        transactionId: ID!
        description: String
        amount: Float
        paymentType: String
        category: String
        date: String
        location: String
    }
`

export default transactionTypeDefs