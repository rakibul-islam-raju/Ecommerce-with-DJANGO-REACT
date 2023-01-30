import React, { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/global/Dashboard";
import HomePage from "./pages/HomePage";

interface ComponentProps {}

const App: FC<ComponentProps> = (): ReactElement => {
	return (
		<>
			<Routes>
				<Route element={<Dashboard />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
