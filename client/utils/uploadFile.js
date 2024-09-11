const uploadFile = async (file) => {
    if (!file) {
        alert("Please select a file to upload");
        return;
    }
    try {
        const formData = new FormData();
        formData.append("file", file);
        console.log('file',file)
        const response = await fetch("http://localhost:4000/upload", { method: "POST", body: formData });
        if (response.ok) {
            const result = await response.json();
            return result.IpfsHash //form-card tem que receber ipfsHash dentro do objeto document na hora de registrar na blockchain
        } else {
            console.error("Error uploading file:", response.statusText);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};

export default uploadFile;