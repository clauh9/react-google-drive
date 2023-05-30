import React from "react";
import NavComponent from "./NavComponent";
import { Container } from "react-bootstrap";
import AddFolder from "./AddFolder";
import AddFile from "./AddFile";
import Folder from "./Folder";
import { useFolder } from "../../hooks/useFolder";
import { useParams } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs ";
import File from "./File";

const Dashboard = () => {
	const { folderId } = useParams();
	const { folder, childFolders, childFiles } = useFolder(
		folderId
		// state.folder
	);

	return (
		<div className="">
			<NavComponent />
			<Container fluid className="pt-3">
				<div className="d-flex align-items-center ">
					<FolderBreadcrumbs currentFolder={folder} />
					<AddFolder currentFolder={folder} />
					<div className="px-1"></div>
					<AddFile currentFolder={folder} />
				</div>

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
				)}
			</Container>
		</div>
	);
};

export default Dashboard;
