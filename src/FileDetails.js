import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { AddFile } from './AddFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faDownload, faLink } from '@fortawesome/free-solid-svg-icons';

export const FileDetails = ({ user }) => {
	const [fileData, setFileData] = useState([])
	const [loading, setLoading] = useState(true)
	const [addStatus, setAddStatus] = useState(false);

	const downloadFile = (binaryData, fileName) => {
		const url = window.URL.createObjectURL(new Blob([binaryData]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	const copyLink = (index) => {
		navigator.clipboard.writeText(`https://linkgeneratorbackend-lingering-night-5957.fly.dev/api/v1/files/download/${user.files[index]}`)
		alert('Link copied to clipboard')
	}
	

	pdfjs.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.js',
		import.meta.url,
	).toString()

	useEffect(() => {
		const fetchFileData = async () => {
			setLoading(true)
			if (user.files && user.files.length > 0) {
				const formData = new FormData()
				formData.append('files', user.files)
				try {
					const response = await axios.post(`https://linkgeneratorbackend-lingering-night-5957.fly.dev/api/v1/files/all`, formData)
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
	}, [user, addStatus]);
	return (
		<div>
			{!loading ?(
				<>
				<div className="absolute z-10 w-10 h-10 cursor-pointer AddButton right-8 top-8" onClick = {() => {setAddStatus(true)}}></div>
				{addStatus ? <AddFile setAddStatus={setAddStatus} user={user}/> : null}
				{addStatus ? <div className="w-[100vw] h-[100vh] bg-black opacity-50 absolute z-10"></div> : null}
					<div className='h-[auto] mt-10'>

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
								const date = new Date(file.id.date)
								return (
									
								<tbody key={index}>
									<tr key={index} className='fileRow'>
										<td>{file.title}</td>
										<td className=''><button onClick={() => {downloadFile(file.file, file.title)}}><FontAwesomeIcon icon={faDownload} style={{color: "green"}}></FontAwesomeIcon></button></td>
										<td><button onClick={() => {copyLink(index)}}><FontAwesomeIcon icon={faLink} style={{color: "grey"}}></FontAwesomeIcon></button></td>
										<td>{file.type}</td>
										<td>{size}</td>
										<td>{date.toDateString()}</td>
										<td><button onClick={(e) => {
											e.preventDefault()
											setFileData(fileData.filter((item) => item.id !== file.id))
											axios.delete(`http://localhost:8080/api/v1/files/${user.id}/${user.files[index]}`)
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
