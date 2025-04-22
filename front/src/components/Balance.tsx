import { UserContext } from "@/App"
import { useContext, useEffect, useState } from "react"

export function Balance() {

        const { state, setState } = useContext(UserContext)
        const  [ balance, setBalance ] = useState("0")

        useEffect(() => {
            const ethereum = (window as any).ethereum

            if(ethereum) {
                ethereum.request({ method: "eth_getBalance", params: [state.acc]}).then((balance: string) => {
                    setBalance(balance)
                })
            }
            else {
                alert("Instalar Metamask")
            }
        }, [state.acc])
    
    return(
        <div>
            <h1>Balance</h1>
            <p>{state.acc} tiene balance: {Number(balance) / 10**18}</p>
        </div>
    )
}