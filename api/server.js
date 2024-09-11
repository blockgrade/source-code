import FormData from 'form-data';
import fetch from 'node-fetch';
import multer from 'multer';
import express from 'express';
import cors from 'cors';
import { createReadStream } from 'fs';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlN2MyMjI0OS0xZDU4LTQxODktYjFkNi0xYThjMTcyNDJjYTAiLCJlbWFpbCI6Imp1YW5jLnMuZGVsaW1hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxN2E0N2U5ZWZmNmE0ZmQ0MzUzYiIsInNjb3BlZEtleVNlY3JldCI6IjgyZDgwODkxNDFiZWQ5OTA0YmQ5MjIyOTg4NmJkYTQ4MDI0MTNiY2FkNTQ1MDU2YWJlNWE3OTI5NGY1ZTY4NzUiLCJpYXQiOjE3MjYwMTQ0NDN9.F8XVKub3564W7Xh31WMIUAs1e4GZITvV4RBP4cE87YA";
const GATEWAY = "gold-far-raven-8.mypinata.cloud";

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json());
app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        const form = new FormData();
        const filePath = file.path;
        form.append('file', createReadStream(filePath));
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JWT}`,
                ...form.getHeaders(),
            },
            body: form,
        });
        const result = await response.json();
        console.log(result)
        res.send(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error uploading file');
    }
});

app.get('/fetch', async (req, res) => {
    const { cid } = req.query;
    const url = `https://${GATEWAY}/ipfs/${cid}`;
    try {
        const response = await fetch(url);
        const content = await response.text();
        res.send(content);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Error fetching file');
    }
});

app.listen(4000, () => {
    console.log('Running API');
});




