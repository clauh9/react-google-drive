import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import Spinner from "react-bootstrap/Spinner";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true);

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPasswd(email) {
		return auth.sendPasswordResetEmail(email);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setPending(false); //need to setCurrentUser before this or it doesnt work
		});

		return unsubscribe;
	}, []);

	if (pending) {
		return (
			<div className="overlay d-flex justify-content-center align-items-center">
				<Spinner animation="border" role="status" variant="primary">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPasswd,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
// export { useAuthContext };
