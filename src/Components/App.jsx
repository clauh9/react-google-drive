import { Container } from "react-bootstrap";
import Signup from "./Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";

function App() {
	return (
		<Container
			className="d-flex justify-content-center align-items-center "
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "450px" }}>
				<Router>
					<AuthProvider>
						<Routes>
							{/* This is so when a user isnt loged in, they cant access ourdashboard, instead they are redirected to the login page */}
							<Route
								exact
								path="/"
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>

							<Route path="/signup" Component={Signup} />
							<Route path="/login" Component={Login} />
							<Route path="/forgot-password" Component={ForgotPassword} />
						</Routes>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
