import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import './App.css'



function App() {
  
  const [poke, setPoke] = useState([])
  const [pokeData, setPokeData] = useState([])
  const [loading, setLoading] = useState(false);
  const [firstDone, setFirstDone] = useState(false);
  const [secondDone, setSecondDone] = useState(false);
  const [displayPokemon, setDisplayPokemon] = useState(false);
  const [chosenPokemon, setChosenPokemon] = useState(0);

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
      <h3>${pokeName}</h3>
      `;

      resultArticle.addEventListener("click", function() {
        setChosenPokemon(pokemon.id)
        setDisplayPokemon(true)
        
      })
      //  Adds the result card to the result container
      resultsContainer.appendChild(resultArticle);
    });

    
    setLoading(false)
    
    
  }



  

  
  

  if(displayPokemon){

    var typeArry = [];
    for(let i of pokeData[chosenPokemon -1].types){
      typeArry.push(i.type.name)
    }

    var moveArry = [];
    for(let i of pokeData[chosenPokemon -1].moves){
      moveArry.push(i.move.name)
    }

    console.log(moveArry)
    
    let displayPokemonHTML = (
      <> 
        <div id="header">
          <h1 id="header"> Pokedex Generation 1 </h1>
          <a id ="link" href="./App.jsx"><h3 id="link">Back</h3></a>
        </div>
        <aside >
          <div id="singleContanier">
            <div id="singlePokemon">
              <h2 id="name">{(pokeData[chosenPokemon - 1 ].name)}</h2>
              <img id="singlePicture" src={pokeData[chosenPokemon - 1].sprites.front_default} />
              <div id="types">
                <h3>Types</h3>
                <ul>
                {typeArry.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                </ul>
              </div>
            </div>
            <div id="moves">
              <h3>Moves</h3>
              <ul>
                {moveArry.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </>
    )

    return displayPokemonHTML
  }

  if (loading){
    return (
      <div>
        <h1 id="Loading">Loading...</h1>
      </div>
    )
  }
  return (
    <>
    <header><h1 id="title">PokeMANS</h1></header>
      <div>
        <div id="titleDiv">
          <h1 id="sub-title">Pokedex Generation 1</h1>
          <h2 id="instruction">Click on a Pokemon to see more information</h2>
        </div>
      <div className="main-container fade-in">
        {/* Add Pokeball Image Here */}
        <img src="/public/pokeball_361998.png" alt="Pokeball" className="pokeball-image" />
      </div>
        <section id="results"></section>
      </div>
        
      
        
      
    </>
  )
}



export default App
