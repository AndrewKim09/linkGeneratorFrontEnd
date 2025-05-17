import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { AddFile } from './AddFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faDownload, faLink } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';

export const FileDetails = () => {
	const [fileData, setFileData] = useState([])
	const [loading, setLoading] = useState(true)
	const [addStatus, setAddStatus] = useState(false);
	const auth = getAuth();


	const downloadFile = (binaryData, fileName) => {
		const url = window.URL.createObjectURL(new Blob([binaryData]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	const copyLink = (id) => {
		console.log(id)
		navigator.clipboard.writeText(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/files/download/${id}`) //FIX
		alert('Link copied to clipboard')
	}
	

	pdfjs.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.js',
		import.meta.url,
	).toString()

	useEffect(() => {
		const fetchFileData = async () => {
			console.log(process.env.REACT_APP_BACKEND_API_URL)
			setLoading(true)
			if (auth.currentUser) {
				const formData = new FormData()
				formData.append('email', auth.currentUser.email)
				try {
					const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/files/all`, formData)
					console.log("response", response);
					setFileData(response.data)
				} catch (error) {
					console.error('Error fetching file data:', error)
				}
			}
			else {
			}
			setLoading(false)
		};

		fetchFileData();
	}, [addStatus]);
	return (
		<div className='flex flex-col items-center w-full h-full h-min-screen'>
			{!loading ?(
				<>
				<div className="absolute z-10 w-10 h-10 cursor-pointer AddButton right-4 top-10" onClick = {() => {setAddStatus(true)}}></div>
				{addStatus ? <AddFile setAddStatus={setAddStatus} user={auth.currentUser.email}/> : null}
				{addStatus ? <div className="absolute z-10 w-full h-[100vh] h-min-[100vh] bg-black opacity-50"></div> : null}
					<div className='h-[auto] w-full mt-10'>

						<table className='w-[80%] text-start table-auto mx-auto shadow-xl'>
							<tbody>
								<tr className="text-white bg-black tableHeader">
									<td>Name</td>
									<td>Download</td>
									<td>Link</td>
									<td>Type</td>
									<td>Size</td>
									<td>Date Created</td>
									<td>Delete</td>
								</tr>
							</tbody>
							{fileData.map((file, index) => {
								var size = file.file.data.length
								if(file.file.data.length > 1000000) {
									size = `${Math.round(file.file.data.length / 1000000, 2)} MB`
								}
								else {
									size = `${Math.round(file.file.data.length / 1000)} KB`
								}
								const date = new Date(file.date)
								return (
									
								<tbody key={file}>
									<tr key={file} className='fileRow'>
										<td>{file.title}</td>
										<td className=''><button onClick={() => {downloadFile(file.file, file.title)}}><FontAwesomeIcon icon={faDownload} style={{color: "green"}}></FontAwesomeIcon></button></td>
										<td><button onClick={() => {copyLink(file.id)}}><FontAwesomeIcon icon={faLink} style={{color: "grey"}}></FontAwesomeIcon></button></td>
										<td>{file.type}</td>
										<td>{size}</td>
										<td>{date.toDateString()}</td>
										<td><button onClick={(e) => {
											e.preventDefault()
											setFileData(fileData.filter((item) => item.id !== file.id))
											axios.delete(`http://localhost:8080/api/v1/files/${file.id}`) //FIX
										}}><FontAwesomeIcon icon={faDeleteLeft} style={{color: "red"}}></FontAwesomeIcon></button></td>
									</tr>
								</tbody>
								)
							})}

						</table>
						

					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}
