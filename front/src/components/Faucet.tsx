import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { UserContext } from "@/App";
import { Loader2 } from "lucide-react";

export function Faucet() {

    const {state, setState} = useContext(UserContext)
    const [tx, setTx] = useState<Object | null>(null)
    const [loading, setLoading] = useState <Boolean>(false)

    async function handleClick() {
        setLoading(true)
        const result = await fetch(`http://localhost:3333/api/faucet/${state.acc}/1`)
        const data = await result.json()
        setTx(data)
        setLoading(false)
        console.log(data)

    }
    return(
        <div className="space-y-4 mt-5">
            <h1 className="text-xl font-bold">Faucet</h1>
            <p>Cuenta {state.acc}</p>
            <Button onClick={async () => handleClick()}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2> : "Solicitar Fondos"}
            </Button>
            {tx && <pre>Transaccion: {JSON.stringify(tx)}</pre>}
        </div>
    )
}