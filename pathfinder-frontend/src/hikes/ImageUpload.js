import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ImageUpload(){
    const [ selectedFiles, setSelectedFiles ] = useState([]);

	const handleImageChange = (e) => {
		// console.log(e.target.files[])
		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

			// console.log("filesArray: ", filesArray);

			setSelectedFiles((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file) // avoid memory leak
			);
		}
	};

    const onSubmit = async (e) => {
        e.preventDefault();
        const result= await axios.put(`http://localhost:8080/imageupload`);
        console.log(result);
       
    }

	const renderPhotos = (source) => {
		console.log('source: ', source);
		return source.map((photo) => {
			return <img src={photo} alt="" key={photo} />;
		});
	};

	return (
		<div className="app">
            <form onSubmit={onSubmit}>
			<div className="heading"><h1>Image Upload</h1></div>
			<div className="container">
				<input type="file" id="file" multiple onChange={handleImageChange} class ="form-control"/>
                </div>
				<hr/>
				<div className="result">{renderPhotos(selectedFiles)}</div>
                </form>
        </div> 
            
		
    
	);
}