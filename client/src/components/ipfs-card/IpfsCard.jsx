import React, { useState } from "react";
import './style.css'
export let fileGlobal;
const PdfUploader = ({ name, onChange }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log('File selected:', selectedFile);
        fileGlobal = selectedFile;
        onChange(selectedFile); // Passa o arquivo para a função handleFileChange do pai
         // Mostra o arquivo imediatamente
    };

    return (
        <div>
            <label htmlFor="file-upload" className="custom-file-upload">SELECT FILE</label>
            <input id="file-upload" name={name} type="file" onChange={handleFileChange} />
        </div>
    );
};

export default PdfUploader;
