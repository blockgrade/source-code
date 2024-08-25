import express from "express"
import { ethers } from "ethers"
import dotenv from 'dotenv'
import abi from "../../artifacts/contracts/GradeRecord.sol/GradeRecord.json" assert { type: "json" }
import path from "path"
import multer from "multer"
import calculateHash from '../utils/fileHash'

dotenv.config()

const API_URL = process.env.API_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const contractAddress = process.env.CONTRACT_ADDRESS

console.log('DOT ENV PORRAAAA')
console.log(API_URL, PRIVATE_KEY, contractAddress)

const provider = new ethers.JsonRpcProvider(API_URL)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const contractInstance = new ethers.Contract(contractAddress, abi, signer)

const router = express.Router()

// Configuração do multer para o armazenamento dos arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/") // Define o diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext) // Define o nome do arquivo com um timestamp
    },
})

// Função de filtro para permitir apenas arquivos PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true)
    } else {
        cb(new Error("Arquivo deve ser um PDF"), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de tamanho do arquivo, por exemplo, 10MB
})

router.get("/grade/:id", async (req, res) => {
    try {
        const id = req.params.id

        const grade = await contractInstance.getGrade(id)

        res.status(200).send(grade)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get("/grade/", async (req, res) => {
    try {
        const grade = await contractInstance.getAllGrades()
        res.status(200).send(grade)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post("/grade/", upload.single('file'), async (req, res) => {
    try {
        const filePath = path.join('uploads', req.file.filename)
        const fileHash = await calculateHash(filePath)
        res.json({ message: 'Arquivo PDF enviado com sucesso!', hash: fileHash })
    } catch (err) {
        res.status(500).json({ error: 'Erro ao calcular o hash do arquivo.' })
    }
})

export default router
