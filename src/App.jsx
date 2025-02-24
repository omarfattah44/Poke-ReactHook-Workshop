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
  const typeDiv = useRef(null);

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

  if (loading){
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  <a href="./App.jsx">Home</a>
  

  if(displayPokemon){
    
    let displayPokemonHTML = (
      <> 
      <aside >
        <div style={{ textAlign: 'center' }}>
          <a href="./App.jsx"><h1>Home</h1></a>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1> Pokedex Generation 1 </h1>
        </div>
        <div>
          <img src={pokeData[chosenPokemon - 1].sprites.front_default} />
          <h2>{pokeData[chosenPokemon - 1 ].name}</h2>
          <div ref={typeDiv}>
            <h2>{pokeData[chosenPokemon - 1 ].types[0].type.name}</h2>
          </div>
        </div>
        </aside>
      </>
    )
    
    console.log(displayPokemonHTML.props.children.props.children[2].props.children[2].props.children.props)
    for(let i of pokeData[chosenPokemon -1].types){
      var type = document.createElement("h2")
      type.textContent = i
    }
    //props.children.props.children[2].props.children[2].props.children.props

    

    return displayPokemonHTML
  }

  return (
    <>
      <div>
        <h1>PokeMANS</h1>
        <h1>Pokedex Generation 1</h1>
        

        <section id="results"></section>
        
        
      </div>
    </>
  )
}



export default App
