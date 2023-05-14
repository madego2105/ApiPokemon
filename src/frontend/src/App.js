import { useEffect, useState } from "react";

function getImage(id){
    fetch(`http://localhost:3000/image/1`, {mode:'cors'})
        .then((response) => console.log(response))
}
export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [image, setImage] = useState(null);

    function searchName(event) {
        fetch(`http://localhost:3000/name/${event.target.value}`, {mode:'cors'})
            .then((response) => response.json())
            .then((pokemon) => {
                setResponse(pokemon);
                setImage(getImage(pokemon[0].id));
                setIsLoading(false);
            });
    }

    return (
        <div class="input-container">
            <div class="search">
                <input name="name" onChange={searchName} placeholder="Filter by name"/>
            </div>
    <p>
        {response && response.map(pokemon =>
            <main className="container main-pokemon">
                <div className="header-main-pokemon">
                    <span className="number-pokemon">{pokemon.id}</span>
                    <div className="container-img-pokemon">
                        <img
                            src={"http://localhost:3000/pokemon/"+pokemon.id+".png"}
                            alt="pokemon"
                        />
                    </div>

                    <div className="container-info-pokemon">
                        <h1>{pokemon.name}</h1>
                        <div className="card-types">
                            <span className={pokemon.type1.toLowerCase()}>{pokemon.type1}</span>
                            <span className={pokemon.type2.toLowerCase()}>{pokemon.type2}</span>
                        </div>
                    </div>
                </div>

                <div className="container-stats">
                    <h1>Stats</h1>
                    <div className="stats">
                        <div className="stat-group">
                            <span>Hp</span>
                            <div className="progress-bar">
                                <div style={{width: pokemon.hp/2 + '%'}}></div>
                            </div>
                            <span className="counter-stat">{pokemon.hp}</span>
                        </div>
                        <div className="stat-group">
                            <span>Attack</span>
                            <div className="progress-bar">
                                <div style={{width: pokemon.attack/2 + '%'}}></div>
                            </div>
                            <span className="counter-stat">{pokemon.attack}</span>
                        </div>
                        <div className="stat-group">
                            <span>Defense</span>
                            <div className="progress-bar">
                                <div style={{width: pokemon.defense/2 + '%'}}></div>
                            </div>
                            <span className="counter-stat">{pokemon.defense}</span>
                        </div>
                        <div className="stat-group">
                            <span>Special Attack</span>
                            <div className="progress-bar">
                                <div style={{width: pokemon.spatk/2 + '%'}}></div>
                            </div>
                            <span className="counter-stat">{pokemon.spatk}</span>
                        </div>
                        <div className="stat-group">
                            <span>Special Defense</span>
                            <div className="progress-bar">
                                <div style={{width: pokemon.spdef/2 + '%'}}></div>
                            </div>
                            <span className="counter-stat">{pokemon.spdef}</span>
                        </div>
                        <div className="stat-group">
                            <span>Speed</span>
                            <div className="progress-bar">
                                <div style={{width: pokemon.speed/2 + '%'}}></div>
                            </div>
                            <span className="counter-stat">{pokemon.speed}</span>
                        </div>
                    </div>
                </div>
            </main>
        )}
    </p>
        </div>
    )
}