import React, { useState } from "react";
import { tezos } from "../utils/tezos";
import { toast } from "react-toastify";
import HeadingUnderline from "./HeadingUnderline";
import Button from "./Button.jsx";
import addresses from "../config/config";
import { fetchMoviesStorage } from "../utils/tzkt";

export default function AddMovieModal({ data, setOpenMovieModal }) {
	const [loading, setLoading] = useState(false);
	const [theatreId, setTheatreId] = useState(0);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [screenNumber, setScreenNumber] = useState("");
	const [ticketPrice, setTicketPrice] = useState("");
	const [startingDate, setStartingDate] = useState("");
	const [posterLink, setPosterLink] = useState("");
	const [timeSlot, setTimeSlot] = useState("");

	const submit = async () => {
		try {
			const contractInstance = await tezos.wallet.at(addresses.movies);

			const storage = await fetchMoviesStorage();

			// const descriptionCIDBytes = await storage.profile[address];

			const op = await contractInstance.methodsObject
				.add_movie({
					_theatreId: theatreId,
					_name: `${name}`,
					_description: `${description}`,
					_posterLink: `${posterLink}`,
					_screenNumber: screenNumber,
					_ticketPrice: ticketPrice,
					_startingDate: `${startingDate}`,
					_timeSlot: `${timeSlot}`,
				})
				.send();
			await op.confirmation(1);

			toast.success(`Voting in favour done!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			console.log("Voting in favour done");
		} catch (err) {
			throw err;
		}
	};

	return (
		<div
			onClick={() => {
				setOpenMovieModal(false);
			}}
			className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-start pt-[100px] bg-black/70 md:px-20"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col items-center p-50 pt-[20px] gap-[50px] bg-primaryBg border-[2px] border-primary rounded-20 lg:w-3/4"
			>
				{loading ? (
					"Loading..."
				) : (
					<>
						<HeadingUnderline>List a Movie</HeadingUnderline>

						<div className="flex flex-col gap-[30px] flex-wrap w-full max-h-[calc(70vh-150px)]">
							<div className="flex flex-row gap-4 items-center w-1/2">
								<p className="font-poppins text-lg font-medium">Name:</p>
								<input
									type="text"
									className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
									placeholder="Eg. Oppenheimer"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="flex flex-row gap-4 items-center w-1/2">
								<p className="font-poppins text-lg font-medium">Description:</p>
								<input
									type="text"
									className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
									placeholder="Eg. During World War II, Lt. Gen. Le...."
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className="flex flex-row gap-4 items-center w-1/2">
								<p className="font-poppins text-lg font-medium">Screen No.:</p>
								<input
									type="number"
									className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
									placeholder="Eg. 5"
									onChange={(e) => setScreenNumber(e.target.value)}
								/>
							</div>
							<div className="flex flex-row gap-4 items-center w-1/2">
								<p className="font-poppins text-lg font-medium">
									Ticket price:
								</p>
								<input
									type="number"
									className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
									placeholder="Eg. 23 ꜩ"
									onChange={(e) => setTicketPrice(e.target.value)}
								/>
							</div>
							<div className="flex flex-row gap-4 items-center w-1/2">
								<p className="font-poppins text-lg font-medium">
									Starting date:
								</p>
								<input
									type="date"
									className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
									onChange={(e) => {
										setStartingDate(e.target.value);
										console.log(e.target.value);
									}}
								/>
							</div>
							<div className="flex flex-row gap-4 items-center w-1/2">
								<p className="font-poppins text-lg font-medium">Time slots:</p>
								<input
									type="text"
									className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
									placeholder="Eg. Oppenheimer"
									onChange={(e) => setTimeSlot(e.target.value)}
								/>
							</div>
							<div className="flex flex-row gap-4 items-center w-1/2">
								<p className="font-poppins text-lg font-medium">
									Landscape poster:
								</p>
								<input
									type="text"
									className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
									placeholder="Eg. https://cdn.movi...."
									onChange={(e) => setPosterLink(e.target.value)}
								/>
							</div>
							<Button
								varient="light"
								gradient={false}
								weight={"medium"}
								style="flex bg-green-500/20 border-green-500/30 hover:bg-green-500/30"
								onClick={submit}
							>
								Submit
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
