import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useContext, useEffect } from "react"
import { UserContext } from "@/App"

export function Header() {
    const { state, setState } = useContext(UserContext)

    useEffect(() => {
        const ethereum = (window as any).ethereum

        if (ethereum){
            ethereum.request({ method: "eth_requestAccounts"}).then((acc: string[]) => {
                setState({acc: acc[0]})
            })
            ethereum.on("accountsChanged", (acc: string[]) => {
                setState({acc: acc[0]})
            })
        }
        else {
            alert("Instalar Metamask")
            return
        }
    }, [setState])

    return(
        <div className="flex gap-2 justify-center pt-4">
            <Link to="home">
                <Button>Home</Button>
            </Link>
            <Link to="faucet">
                <Button>Faucet</Button>
            </Link>
            <Link to="balance">
                <Button>Balance</Button>
            </Link>
            <Link to="transfer">
                <Button>Transfer</Button>
            </Link>
            <div className="flex gap-2 justify-center pt-4">
                {state.acc}
            </div>
        </div>
    )
}