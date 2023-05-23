import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import ContainerCenter from "./ContainerCenter";

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPasswd } = useAuthContext();
	const [error, setError] = useState("");
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await resetPasswd(emailRef.current.value);
			setSent(true);
		} catch (error) {
			setError("Error sending email");
		}

		setLoading(false);
	}

	return (
		<ContainerCenter>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-3">Log in</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{sent && (
						<Alert variant="warning">
							{"If you have an account an email with be sent"}
						</Alert>
					)}
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formPlaintextEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="email@example.com"
								required
								ref={emailRef}
							/>
						</Form.Group>

						<Form.Group>
							<div className="col-md-12 text-center">
								<Button disabled={loading} type="submit" variant="primary">
									Reset Password
								</Button>
							</div>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>

			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/login">Log in</Link>
			</div>
		</ContainerCenter>
	);
};

export default ForgotPassword;
