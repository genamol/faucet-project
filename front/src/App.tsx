import { Button } from "@/components/ui/button"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import { Dashboard } from "./components/Dashboard"
import { Home } from "./components/Home"
import { Faucet } from "./components/Faucet"
import { Balance } from "./components/Balance"
import { Transfer } from "./components/Transfer"
import { createContext, useState, useEffect } from "react"

const router = createBrowserRouter([
  {path: "/",
    element: <Dashboard/>, 
    children:[
      {path: "home", element: <Home/>},
      {path: "faucet", element: <Faucet/>},
      {path: "balance", element: <Balance/>},
      {path: "transfer", element: <Transfer/>},
    ]
  }
])

export const UserContext = createContext({})

function App() {

  const [state, setState] = useState({
    acc: "xxxxx"
  })

  return (
    <UserContext.Provider value={{state, setState}}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  )
}

export default App
