import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {ethers} from "ethers"
import { useState } from "react";

export function Transfer() {
  const [tx, setTx] = useState<object | null>(null)
  const form = useForm()

  async function onSubmit(data : any){
    const provider = new ethers.BrowserProvider((window as any).ethereum)
    const signer = await provider.getSigner(data.from)
    const transaction = await signer.sendTransaction({
      to: data.to,
      value: ethers.parseEther(data.amount)
    })
    setTx(transaction)
  }

  return<div className="space-y-4 mt-3">

    <h1 className="text-xl font-bold">Transfer</h1>
    <p>Transfer your money here</p>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address de origen</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address receptora</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto en ETH a enviar</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <Button>Transfer</Button>
      </form>
    </Form>
    {
      tx && <div>
      <h2>Transaccion realizada</h2>
      <pre> {JSON.stringify(tx, null, 4)}</pre>
      </div>
      
      }

  </div>
}