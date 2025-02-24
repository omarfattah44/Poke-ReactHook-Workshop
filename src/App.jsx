import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [poke, setPoke] = useState([])
  const [pokeData, setPokeData] = useState([])
  const [loading, setLoading] = useState(false);
  const [firstDone, setFirstDone] = useState(false);
  const [secondDone, setSecondDone] = useState(false);

  const fetchData = async () => {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    let data = await res.json()
    setPoke(data) 
    setFirstDone(true);
  }
  

  // First effect
  useEffect(() => {
    setLoading(true)
    fetchData();
  }, []); // Runs on mount
  
  // Second effect, dependent on firstDone
  useEffect(() => {
    if (firstDone) {
      individualPoke();
      // console.log("Second effect running after first");
    }
  }, [firstDone]);

  useEffect(() => {
    pokeCard()
  }, [secondDone])

  const individualPoke = async () => {
    var resultArry = []
    for(let i of poke.results) {
      let url = i.url
      let res = await fetch(url)
      let data = await res.json()
      resultArry.push(data)
    }
    setPokeData(resultArry)
    setSecondDone(true)
  }

  function pokeCard(){
    const resultsContainer = document.getElementById("results");
    pokeData.forEach(pokemon => {
      console.log("forEach looper")
      // Checks if card has an image. Returns the normal sized image if true or placeholder if false
      // Adds the description or returns a placeholder
      const imageUrl = pokemon.sprites.front_default;
      const pokeName = pokemon.name;
      // Creates article element for each card
      const resultArticle = document.createElement("article");
      // Configures the display of each card
      resultArticle.innerHTML = `
      <figure>
          <img src="${imageUrl}" alt="${pokeName}">
      </figure>
      <h3>${pokeName}</h3>`;
      //  Adds the result card to the result container
      resultsContainer.appendChild(resultArticle);
    });

    setLoading(false)
  }

  if (loading){
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <div>
        <h1>PokeMANS</h1>
        {
          console.log(pokeData[0])
        }

        <section id="results"></section>
        
        
      </div>
    </>
  )
}

{/* <section id="results"></section> */}
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
// 
// `;
 // Adds the result card to the result container
//  resultsContainer.appendChild(resultArticle);
//   });

export default App
