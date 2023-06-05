import React from "react";
import {
	ThreeDotsVertical,
	FileEarmarkWord,
	FiletypePdf,
} from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { database, projectStorage } from "../../firebase";

function getFileType(fileName) {
	let type = String(fileName).split(".")[1];
	return type;
}

const IMG = ["png", "jpeg", "jpg"];
const TXT = ["txt"];
const PDF = ["pdf"];

const File = ({ file }) => {
	const type = getFileType(file.name);

	const renderFileContent = () => {
		if (IMG.includes(type)) {
			return <Card.Img variant="top" src={file.url} />;
		} else if (TXT.includes(type)) {
			return <FileEarmarkWord />;
		} else if (PDF.includes(type)) {
			return <FiletypePdf />;
		}
	};

	const deleteFile = (e) => {
		e.preventDefault();

		database.files.doc(file.id).delete(); // Delete the current file from firestore

		const refToDelete = projectStorage.refFromURL(file.url);
		refToDelete.delete();
	};

	// The popup that shows up when we click the 3 dots
	const popover = (
		<Popover>
			<Popover.Body onClick={deleteFile}>Delete File</Popover.Body>
		</Popover>
	);

	return (
		<Col sm={12} className="mb-4">
			<Card className="">
				{renderFileContent()}
				<Card.Body className="d-flex align-items-center">
					<Card.Title className="text-truncate w-100">
						<Card.Link href={file.url} target="_blank">
							{file.name}
						</Card.Link>
					</Card.Title>
					<OverlayTrigger
						trigger="click"
						placement="bottom"
						overlay={popover}
						rootClose //so it closes when you click somewhere else
					>
						<ThreeDotsVertical onClick={(e) => e.preventDefault()} />
					</OverlayTrigger>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default File;
