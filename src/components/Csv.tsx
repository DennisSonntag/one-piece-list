import { useEffect, useState } from 'react';

const Csv = () => {
	const [onePieceDataRaw, setOnePieceDataRaw] = useState<string>('');
	const [onePieceData, setOnePieceData] = useState<string[][]>([]);

	const fetchData = async () => {
		const raw = await fetch('http://localhost:3000/OnePiece.csv');
		const res = await raw.text();
		setOnePieceDataRaw(res);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		let arr = onePieceDataRaw.split('\r\n');
		let newArr = arr.map(x => x.split(','));
		console.log(newArr);
		setOnePieceData(newArr);
	}, [onePieceDataRaw]);

	let firstData = onePieceData.splice(0, 1)[0];
	firstData = firstData ? firstData : []

	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						{firstData.map(x => (
							<th>{x}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{onePieceData.slice(1).map(x => (
						<tr>
							<th>{x[0]}</th>
							{x.slice(1).map(x => (
								<td>{x}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Csv;
