import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faX } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'
import { Notification } from './Notification'



export const AddFile = ({setAddStatus, user}) => {
	const [fileList, setFileList] = useState([])
	const [disable, setDisable] = useState(false)
	const [loading, setLoading] = useState(false)
	const [notification, setNotification] = useState(false);

	const uploadFiles = async () => {
		setDisable(true)
		setLoading(true)

		if(fileList.length == 0) {
			setDisable(false)
			setLoading(false)
			return
		}
		else{
			for(let i = 0; i < fileList.length; i++) {
				const formData = new FormData()
				formData.append('file', fileList[i])
				formData.append('id', user.id)
				formData.append('title', fileList[i].name)


				try {
					const response = await axios.post('https://linkgeneratorbackend-lingering-night-5957.fly.dev/api/v1/files/add', formData)
					if(response.status === 201) {
						setNotification(true)

						setTimeout(() => {
							setNotification(false)
						}, 10000);
					}
				} catch (error) {
					console.error('Error uploading file:', error)
				}
			}
		}


		setDisable(false)
		setLoading(false)
	}
	const dropFunction = () => {
		const dropArea = $('.drop-area')
		dropArea.off();
		
		const active = () => dropArea.addClass("border-green-400")
		const inactive = () => dropArea.removeClass("border-green-400")
		const prevents = (e) => {e.preventDefault() ; e.stopPropagation()}

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			dropArea.on(eventName, prevents)
		})

		;['dragenter', 'dragover'].forEach(eventName => {
			dropArea.on(eventName, active)
		})

		;['dragleave', 'drop'].forEach(eventName => {
			dropArea.on(eventName, inactive)
		})

		dropArea.on('drop', (e) => {
			if(disable) return
			var fileListToAdd = []
			
			for(let i = 0; i < e.originalEvent.dataTransfer.files.length; i++) {
				fileListToAdd.push(e.originalEvent.dataTransfer.files[i])
			}

			setFileList((fileList) => [...fileList, ...fileListToAdd]);
		})
	}


	useEffect(() => {
		dropFunction()
	},[])
  return (
    <div className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-60%] h-[60%] w-[100vh] bg-white z-20 rounded-xl overflow-auto">
			{notification ? 
					<Notification checkmark={true} text={"File uploaded successfully"}/>
				: 
					null}


			<FontAwesomeIcon icon={faX} className='absolute cursor-pointer w-7 h-7 top-5 right-3' onClick={() => {setAddStatus(false)}}/>
      <div className = "w-[50%] h-[30%] rounded-xl m-auto border-dashed border-2 border-black mt-6 flex flex-col items-center justify-center drop-area overflow-hidden">
				{loading ? 
					<div className='loader'></div> 
				:
					<>
						<FontAwesomeIcon icon ={faFile} className='w-10 h-10 mb-10'/>
						<p>Drop your files here!</p>
					</>
				}
			</div>
			<div className="w-[80%] h-[50%] rounded-xl m-auto border-solid border-2 border-black mt-10 flex flex-col overflow-auto">
				{fileList.map((file, index) => {
					return (
						<div key={index} className='flex items-center justify-between w-full py-2 mt-1 border-2 border-black border-solid rounded-md'>
							<p>{file.name}</p>
							<FontAwesomeIcon icon={faX} className='w-5 h-5 mr-5 cursor-pointer' onClick={() => {
								setFileList((fileList) => {
									const newFileList = [...fileList]
									newFileList.splice(index, 1)
									return newFileList
								})
							}}/>
						</div>
					)
				})}
			</div>

			<button className='h-7 ml-[50%] translate-x-[-50%] bg-green-600 w-[10%] rounded-xl mt-3' onClick={uploadFiles}>
				Submit
			</button>
    </div>
  )
}
