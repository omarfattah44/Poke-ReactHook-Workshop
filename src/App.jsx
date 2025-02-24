import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [repos, setRepos] = useState([])

  const fetchData = async () => {
    let res = await ("https://pokeapi.co/api/v2/pokemon/1/")
    let data = await res.json()
    setRepos(data) 
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div>
        {
          repos.map(  items => console.log(items))
        }
      </div>
    </>
  )
}

export default App
