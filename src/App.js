import React, { useState } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Shop from './layout/Shop';
import ContextProvider from './context';

function App() {
	const [mcdonalds, setMcdonalds] = useState(false);
	const [kfc, setKfc] = useState(false);
	const [egersund, setEgersund] = useState(false);

	return (
		<>
			<ContextProvider>
				<Header
					setMcdonalds={setMcdonalds}
					setKfc={setKfc}
					setEgersund={setEgersund}
				/>
				<Shop
					mcdonalds={mcdonalds}
					kfc={kfc}
					egersund={egersund}
					setMcdonalds={setMcdonalds}
					setKfc={setKfc}
					setEgersund={setEgersund}
				/>
				<Footer />
			</ContextProvider>
		</>
	);
}

export default App;
