import React, { useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../../firebase";
import {
	Button,
	Dropdown,
	OverlayTrigger,
	Popover,
	Toast,
} from "react-bootstrap";
import { Folder as F, ThreeDotsVertical } from "react-bootstrap-icons";

const Folder = ({ folder }) => {
	const [showB, setShowB] = useState(false);
	const toggleShowB = () => setShowB(showB);
	const threeDots = (e) => {
		e.preventDefault();
		setShowB(!showB);
	};

	function deleteFolder(e) {
		e.preventDefault();
		console.log(folder.id);
		database.folders.doc(folder.id).delete();
	}

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body onClick={deleteFolder}>Delete Folder</Popover.Body>
		</Popover>
	);

	return (
		<>
			<Button
				to={{
					pathname: `/folder/${folder.id}`,
					state: { folder: folder },
				}}
				variant="outline-dark"
				className="text-truncate w-100"
				as={Link}
			>
				{/* <F /> {folder.name} <ThreeDotsVertical onClick={threeDots} /> */}
				<F /> {folder.name}{" "}
				<OverlayTrigger
					trigger="click"
					placement="bottom"
					overlay={popover}
					delay={{ show: 250, hide: 400 }}
				>
					<ThreeDotsVertical onClick={(e) => e.preventDefault()} />
				</OverlayTrigger>
			</Button>
			{/* <Toast onClose={toggleShowB} show={showB} animation={false}>
				<Toast.Body>Delete</Toast.Body>
			</Toast> */}
		</>
	);
};

export default Folder;
