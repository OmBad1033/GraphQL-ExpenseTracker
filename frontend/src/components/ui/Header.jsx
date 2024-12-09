import { TypewriterEffectSmooth } from "./typewriter-effect";
import { Link } from "react-router-dom";
const Header = () => {
	const words = [
		{
		  text: "Expense-",
		  className: "text-white dark:text-white",
		},
		{
		  text: "GQL",
		  className: "text-purple-500 dark:text-purple-500",
		},
	  ];
	return (
		<div className='flex flex-col items-center justify-center mb-10'>
			<Link to='/'>
			
			<h1 className='flex justify-center relative z-50 pt-10'><TypewriterEffectSmooth words={words} className={'text-5xl md:text-8xl lg:text-10xl sm:text-6xl'}/></h1>
			</Link>
			<div className='relative mb-10 w-1/2 mx-auto hidden md:block'>
				{/* Gradients */}
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
			</div>
		</div>
	);
};
export default Header;