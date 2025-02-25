import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import './App.css'


function App() {
  //useState with list of all 151 poke with name and url
  const [poke, setPoke] = useState([])
  //useState with expanded list of all pokemon including name stats moves and images
  const [pokeData, setPokeData] = useState([])
  //use state that is set true when the page starts loading and is set back to false when the page is done loading
  const [loading, setLoading] = useState(false);
  //use states that check if a fetch function is done running before another function starts
  const [firstDone, setFirstDone] = useState(false);
  const [secondDone, setSecondDone] = useState(false);
  //is set to true when a pokemon is clicked on it then displays that pokemonds data
  const [displayPokemon, setDisplayPokemon] = useState(false);
  //use state that stores the id of the selected pokemon for data grabbing
  const [chosenPokemon, setChosenPokemon] = useState(0);

  //inital fetch that grabs all 151 pokemon
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

  //once all data for the 151 pokemon is fetched it calls the pokeCard function to make all the cards to be displayed
  useEffect(() => {
    pokeCard()
  }, [secondDone])

  //this iterates over all 151 pokemon and fetches the data for each one and adds it to an array
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


  //this takes all the completed fetch data for the pokemon and makes it a card to be displayed
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



  

  
  
  //checks if a pokemon has been been chosen. If so it displays the specialized information from that pokemon.
  if(displayPokemon){
    //sets an array of types for the pokemon to be dispayed later in the code
    var typeArry = [];
    for(let i of pokeData[chosenPokemon -1].types){
      typeArry.push(i.type.name)
    }

    //sets an array of moves to be displayed later in the code
    var moveArry = [];
    for(let i of pokeData[chosenPokemon -1].moves){
      moveArry.push(i.move.name)
    }
    
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


  //checks if the page is loading if so it sends out a loading h1 (this doesnt happen cause the page is too fast)
  if (loading){
    return (
      <div>
        <h1 id="Loading">Loading...</h1>
      </div>
    )
  }

  //default html for the page it shows all 151 pokemon with all of the cards. 
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
