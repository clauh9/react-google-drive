import React, { useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const NavComponent = () => {
	const { currentUser, logout } = useAuthContext();
	const history = useNavigate();
	const [error, setError] = useState("");

	async function handleLogout() {
		setError("");

		try {
			await logout();
			history("/login");
		} catch {
			setError("Failed to log out");
		}
	}

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Navbar.Brand href="/" className="mx-3">
				<img
					alt=""
					src="/src/images/Google.png"
					width="30"
					height="30"
					className="d-inline-block align-top"
				/>{" "}
				Google Drive
			</Navbar.Brand>
			<Navbar.Collapse className="justify-content-end ">
				<Navbar.Text>{currentUser.email}</Navbar.Text>
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavComponent;
