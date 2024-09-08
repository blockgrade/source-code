import React, { useState } from "react";
import { create } from "ipfs-http-client";

// URL padrão para o IPFS Desktop
const ipfsClient = create("http://localhost:5001");

const PdfUploader = () => {
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        try {
            setLoading(true);
            const addedFile = await ipfsClient.add(file);
            setIpfsHash(addedFile.path); // O hash IPFS do arquivo
            setLoading(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload PDF to IPFS</h2>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload PDF"}
            </button>

            {ipfsHash && (
                <div>
                    <p>IPFS Hash: {ipfsHash}</p>
                    <a
                        href={`https://ipfs.io/ipfs/${ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View PDF
                    </a>
                </div>
            )}
        </div>
    );
};

export default PdfUploader;
