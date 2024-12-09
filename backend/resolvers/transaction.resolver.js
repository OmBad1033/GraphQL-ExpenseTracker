import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js"

const transactionResolver ={
    Query:{
        getTransactions: async (_, __, context) => {
            try{
                if(!context.getUser()._id) throw new Error("Unauthenticated");
                const userId = context.getUser()._id;
                const transactions = await Transaction.find({userId});
                console.log(transactions);
                return transactions
            } catch (err){
                console.log("Error getting transactions", err);
                throw new Error(err.message || "Something went wrong");
            }
        },

        getTransaction: async(_, {transactionId},)=>{
            try{
                console.log("transactionId", transactionId);
                const transaction = await Transaction.findById(transactionId);
                return transaction
            } catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }

        },

        categoryStatistics: async(_, __, context)=>{
            if(!context.getUser()._id) throw new Error("Unauthenticated");
            const userId = context.getUser()._id;
            const transactions = await Transaction.find({userId});
            const categoryMap = {};
            transactions.forEach(transaction=>{
                if(!categoryMap[transaction.category]){
                    categoryMap[transaction.category] = 0;
                }
                categoryMap[transaction.category] += transaction.amount;

            })
            return Object.entries(categoryMap).map(([category, totalAmount])=>({category, totalAmount}));
        }

    },
    Mutation:{
        createTransaction: async(_, {input}, context)=>{
            try{
                console.log("new transaction", input);
                const newTransaction = new Transaction({...input, userId: context.getUser()._id});
                await newTransaction.save();
                return newTransaction;
            }catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
            
        },
        updateTransaction: async(_, {input},)=>{

            try{
                console.log("updated transaction", input);
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input, {new: true});
                return updatedTransaction
            }catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
            
        },
        deleteTransaction: async(_, {transactionId},)=>{
            try{
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
        }
    },
    Transaction:{
        user: async(parent)=>{
            try{
                const user = await User.findById(parent.userId);
                return user;
            } catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
        }
    }

}

export default transactionResolver;