import React, { Component, useState } from 'react';
import Geocode from "react-geocode";
import Local from '../models/local';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import '../styles/search.css';

export class Search extends React.Component {

    constructor(props) {
        super(props);
        //Configurações geocode

        //È necessario criar um arquivo .env na raiz do projeto e adicionar a contante REACT_APP_GOOGLE_MAPS_KEY_API recebendo a chave da API do google
        
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY_API);
        Geocode.setLanguage("pt-br");
        Geocode.setRegion("br");

        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      


    toArray = (obj) => {
        const arr = [obj];
        return arr;
    }



    submitHandler = (e) => {
        e.preventDefault();
        const data = this.state.value;
        const cep = data?.replace(/[^0-9]/g,'');
        if(cep?.length !==8){            
            return <alert>CEP inválido</alert>;
        }
        fetch('http://viacep.com.br/ws/' + data + '/json/')
            .then(response => response.json())
            .then(data => {

                const array = this.toArray(data);
                console.log("update:" + data.cep);
                const endereco = data.logradouro + data.bairro + data.localidade + data.uf;
                Geocode.fromAddress(endereco).then(
                    (response) => {
                        const { lat, lng } = response.results[0].geometry.location;
                        console.log(lat, lng);
                        const localInitial = new Local({ cep: data.cep, lat: lat, lng: lng, publicPlace: data.logradouro, district: data.bairro, location: data.localidade, uf: data.uf })
                        this.props.triggerParentUpdate(localInitial);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            })
            .catch(error => console.error);
    }
    render() {

        return (


            <Paper component="form" className={"paper"}>
                <InputBase
                    className={"input"}
                    placeholder="Buscar com CEP"
                    value={this.state.value}
                    onChange={this.handleChange}
                    type="text"
                />
                <IconButton type="submit" className={"iconButton"} aria-label="search" onClick={this.submitHandler}>
                    <SearchIcon />
                </IconButton>
            </Paper>

        );
    }
}