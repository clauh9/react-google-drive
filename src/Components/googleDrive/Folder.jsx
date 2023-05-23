import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Folder as F } from "react-bootstrap-icons";

const Folder = ({ folder }) => {
	return (
		<Button
			to={{
				pathname: `/folder/${folder.id}`,
				state: { folder: folder },
			}}
			variant="outline-dark"
			className="text-truncate w-100"
			as={Link}
		>
			<F /> {folder.name}
		</Button>
	);
};

export default Folder;
