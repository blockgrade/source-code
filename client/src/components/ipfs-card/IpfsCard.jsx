import React, { useState } from "react";

const PdfUploader = () => {
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
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
            
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={uploadFile}>
                <label htmlFor="file-upload" className="custom-file-upload">Select File</label>
                <input id="file-upload" type="file" onChange={handleFileChange} />
                <button className="button" type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload file'}</button>
            </form>
        </div>
    );
};

export default {PdfUploader, uploadFile};
