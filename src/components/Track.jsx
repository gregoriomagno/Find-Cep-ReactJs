import React from 'react'
import '../styles/track.css';

function Track(props) {

    if (props.events[0].cep == null) {

        return null;
    }

    return (
        <div className="search-result">
            <h5>Resultado:</h5>
            <ul className="list-group-item">

                {props.events.map(item =>
                    <li key={item.cep}>
                        <span>
                            CEP: {item.cep}
                            <button className="buttonFavorite" onClick={() => { props.favorite(item); }}>Favorite
                            </button>
                        </span>
                        <span>Logradouro: {item.publicPlace} </span>
                        <span>Bairro: {item.district} </span>
                        <span>Localidade: {item.location} </span>
                        <span>UF: {item.uf} </span>

                    </li>
                )}
            </ul>
        </div>

    );
}
export default Track;