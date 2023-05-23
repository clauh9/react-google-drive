import React from "react";
import NavComponent from "./NavComponent";
import { Container } from "react-bootstrap";
import AddFolder from "./AddFolder";
import AddFile from "./AddFile";
import Folder from "./Folder";
import { useFolder } from "../../hooks/useFolder";
import { useLocation, useParams } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs ";

const Dashboard = () => {
	const { folderId } = useParams();
	// const { folderId } = "XcyhcjulefMwG1iizU83";
	// const { state = {} } = useLocation();
	const { folder, childFolders, childFiles } = useFolder(
		folderId
		// state.folder
	);

	return (
		<>
			<NavComponent />
			<Container fluid>
				<FolderBreadcrumbs currentFolder={folder} />
				<AddFolder currentFolder={folder} />
				<AddFile />

				{childFolders.length > 0 && (
					<div className="d-flex flex-wrap">
						{childFolders.map((childFolder) => (
							<div
								key={childFolder.id}
								style={{ maxWidth: "250px" }}
								className="p-2"
							>
								<Folder folder={childFolder} />
							</div>
						))}
					</div>
				)}

				{/* {childFolders.length > 0 && (
					<div className="d-flex flex-wrap">
						{childFolders.map((childFolder) => (
							<div
								key={childFolder.id}
								style={{ maxWidth: "250px" }}
								className="p-2"
							>
								<Folder folder={childFolder} />
							</div>
						))}
					</div>
				)}
				{childFolders.length > 0 && childFiles.length > 0 && <hr />}
				{childFiles.length > 0 && (
					<div className="d-flex flex-wrap">
						{childFiles.map((childFile) => (
							<div
								key={childFile.id}
								style={{ maxWidth: "250px" }}
								className="p-2"
							>
								<File file={childFile} />
							</div>
						))}
					</div>
				)} */}
			</Container>
		</>
	);
};

export default Dashboard;
