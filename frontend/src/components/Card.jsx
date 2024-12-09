import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { useMutation } from "@apollo/client";
import { GET_TRANSACTIONS, GET_TRANSACTIONS_STATISTICS } from "../graphql/queries/transaction.query";


const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-red-600 to-red-300",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ transaction }) => {
	const cardClass = categoryColorMap[transaction.category];
	let description = transaction.description[0]?.toUpperCase() + transaction.description.slice(1);
	let category = transaction.category[0]?.toUpperCase() + transaction.category.slice(1);
	let formatedDate = formatDate(transaction.date);
	const [deleteTransaction, {loading, error}] = useMutation(DELETE_TRANSACTION,{
		refetchQueries: [GET_TRANSACTIONS, GET_TRANSACTIONS_STATISTICS]
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const handleDelete = async() => {
		try {
			await deleteTransaction({variables: {transactionId: transaction._id}});
			toast.success("Transaction deleted successfully");
		} catch (error) {
			toast.error(error.message);
		}

	};
	console.log("Transaction data", transaction);

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"} onClick={handleDelete} disabled={loading}/>
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {transaction.paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: {transaction.amount}
				</p>
				
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {transaction.location}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>{formatedDate}</p>
					<img
						src={transaction.user.profilePicture}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;