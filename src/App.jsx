import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [poke, setPoke] = useState([])
  const [pokeData, setPokeData] = useState([])

  const fetchData = async () => {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    let data = await res.json()
    setPoke(data) 
    
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    individualPoke()
  }, [poke])

  
  let allresults = poke.results

  const individualPoke = async () => {
    var resultArry = []
    for(let i of allresults) {
      let url = i.url
      let res = await fetch(url)
      let data = await res.json()
      resultArry.push(data)
    }
    setPokeData(resultArry)
  }
  

  return (
    <>
      <div>
        <h1>PokeMANS</h1>
        {
          console.log(pokeData)
        }
        <h1>{pokeData[80].name}</h1>
        <img src={pokeData[80].sprites.front_default}/>
        
        
      </div>
    </>
  )
}

// const resultsContainer = document.getElementById("results");
// Resets the search results container with a fresh empty string
// resultsContainer.innerHTML = "";
 // Loops through each card object in the array and processes them individually
//  data.data.forEach(card => {
//   // Checks if card has an image. Returns the normal sized image if true or placeholder if false
//   const imageUrl = card.image_uris ? card.image_uris.normal : "https://via.placeholder.com/200";
//   const cardName = card.name;
//   // Adds the description or returns a placeholder
//   const description = card.oracle_text || "No description available.";
//   // Creates article element for each card
//   const resultArticle = document.createElement("article");
// Configures the display of each card
// resultArticle.innerHTML = `
// <figure>
//     <img src="${imageUrl}" alt="${cardName}">
// </figure>
// <h3>${cardName}</h3>
// <p>${description}</p>
// <button class="save-btn"
//     data-name="${cardName}"
//     data-image="${imageUrl}"
//     data-description="${description}">
//     Save
// </button>
// `;
 // Adds the result card to the result container
//  resultsContainer.appendChild(resultArticle);
//   });

export default App
