import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Cards = () => {

	const {data, loading, error} = useQuery(GET_TRANSACTIONS);
	if (error) return <p>Error: {error.message}</p>;
	if (loading) return <p>Loading...</p>;
	console.log("cards", data);
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{data.getTransactions.map((transaction) => (
					<Card key={transaction.id} transaction={transaction} />
				))}
				{
					data.getTransactions.length === 0 && (
						<p className='text-3xl font-bold text-center my-10'>No transactions yet</p>
					)
				}
			</div>
		</div>
	);
};
export default Cards;