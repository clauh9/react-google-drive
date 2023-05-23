import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import Dashboard from "./googleDrive/Dashboard";

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						{/* Drive */}
						<Route
							exact
							path="/"
							element={
								<PrivateRoute>
									{/* This is so when a user isnt loged in, they cant access ourdashboard, instead they are redirected to the login page */}
									<Dashboard />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/folder/:folderId"
							element={
								<PrivateRoute>
									{/* This is so when a user isnt loged in, they cant access ourdashboard, instead they are redirected to the login page */}
									<Dashboard />
								</PrivateRoute>
							}
						/>

						{/* Auth */}
						<Route path="/signup" Component={Signup} />
						<Route path="/login" Component={Login} />
						<Route path="/forgot-password" Component={ForgotPassword} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
