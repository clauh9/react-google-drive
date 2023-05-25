import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FileEarmarkPlus, ThreeDotsVertical } from "react-bootstrap-icons";

const AddFile = ({ currentFolder }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button onClick={handleShow} variant="outline-success" size="sm">
				<FileEarmarkPlus size={18} />
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Pick a file to upload</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Control type="file" />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddFile;