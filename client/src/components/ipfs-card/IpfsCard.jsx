import React, { useState } from "react";
import './style.css'

const PdfUploader = ({ name, value, onChange }) => {
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        onChange(selectedFile)
        setFile(selectedFile);
    };

    const uploadFile = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file to upload");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            console.log('file',file)
            const response = await fetch("http://localhost:4000/upload", { method: "POST", body: formData });
            if (response.ok) {
                const result = await response.json();
                setIpfsHash(result.IpfsHash); //form-card tem que receber ipfsHash dentro do objeto document na hora de registrar na blockchain
            } else {
                console.error("Error uploading file:", response.statusText);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <label htmlFor="file-upload" className="custom-file-upload">SELECT FILE</label>
            <input id="file-upload" name={name} type="file" onChange={handleFileChange} />
            {/* <button className="button" type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload file'}</button> */}
        </div>
    );
};

export default PdfUploader;
