import { AllRoutes } from "./AllRoutes/AllRoutes";
import { Login } from "./Components/Auth/Login";
import { Demo, Navbar } from "./Components/Navbar/Navbar";


export default function App() {

		

	return (
		<>
			{/* <Login /> */}
			{/* <Demo /> */}
			<Navbar />
			<AllRoutes />
		</>
	);
}
