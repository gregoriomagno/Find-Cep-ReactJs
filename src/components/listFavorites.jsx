import React from 'react'
import '../styles/listFavorite.css';

function ListFavorites(props) {

    // if (props.events[0].cep==null) {
      
    //     return null;
    // }
    
    return (
        <div className="listFavorites">
            <h6>Locais favoritos:</h6>
        {props.favorites.map(favorite =>
                            
            <li className="itemListFavorite" key={favorite.cep}>
                <span>CEP: {favorite.cep} 
                <input className="buttonMap" type = "button" name = "lib" id = "map" value = "Ver no Mapa" onClick={()=>props.addFavorite(favorite) } ></input></span>
            </li> )}
            
            </div>
        

    );
}
export default ListFavorites;