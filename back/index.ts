import express from "express"
import { Request, Response } from "express"
import fs from "fs"
import cors from "cors"
import { ethers } from "ethers"

const app = express()

app.use(express.json())
app.use(cors())


app.get("/api/balanceethers/:address", async (req: Request, res: Response) =>{
    const {address} = req.params
    const provider = new ethers.JsonRpcProvider("http://localhost:8545")
    const balance = await provider.getBalance(address)
    res.json({
        address,
        balance: Number(balance) / 10**18,
        fecha: new Date()
    })
})

app.get("/api/balance/:address", async (req: Request, res: Response) => {

    const { address } = req.params

    const resultado = await fetch(`http://localhost:8545/`, {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            jsonrpc: `2.0`,
            method: `eth_getBalance`,
            params: [
            address,
            `latest`
        ],
        id: 1
        })
    })
    const data = await resultado.json()
    res.json({
        address,
        balance: Number(data.result) / 10**18,
        fecha: new Date()
})
})

app.get("/api/faucet/:address/:amount", async(req: Request, res: Response) => {
    const { address, amount } = req.params
    const provider = new ethers.JsonRpcProvider("http://localhost:8545/")
    const ruta = "../nodo/datos/keystore/UTC--2025-03-28T14-35-47.856579531Z--3dae3b0715be6ae0745238dff9bf74fed80de3ca.json"
    const rutaData = fs.readFileSync(ruta, "utf-8")
    const wallet = await ethers.Wallet.fromEncryptedJson(rutaData, "")
    const walletConnected = wallet.connect(provider)
    const tx = await walletConnected.sendTransaction({
        to: address,
        value: ethers.parseEther(amount)
    })
    await tx.wait()
    const balance = await provider.getBalance(address)
    res.json({
        address,
        balance: Number(balance) / 10**18,
        fecha: new Date()
    })
})

app.listen(3333, () => {
    console.log("Servidor escuchando en el puerto 3333")
})