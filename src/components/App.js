import React, { useEffect, useState } from 'react';
import Track from './Track';
import ListFavorites from './listFavorites';
import '../styles/main.css';
import Map from './map';
import { Row, Col,ListGroup, ListGroupItem  } from 'reactstrap';
import { Search } from './search'
import { Component } from 'react';
import Local from '../models/local';
export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            favorites : [],
            local: new Local({ cep: null, lat: -5.08921, lng: -42.8016 }),

        };
      }


         addFavorite=(local)=> {
            console.log("list favorites");
            console.log(this.state.favorites);
            if (!this.state.favorites.some(alreadyFavorite => alreadyFavorite.cep == local.cep)) {
                this.state.favorites.push(local);
                this.setState({...this.state,favorites:this.state.favorites});
                 let list=[];

                 for (var i = 0; i < this.state.favorites.length; i++) {
                    list.push(this.state.favorites[i]);
                    
                 }
                localStorage.setItem('@findcep-app/dataFavorites', JSON.stringify(list));
                

              
            }

        }
        
        updateSearch =(local) =>{ 
            this.setState({...this.state,local:local});
        }

        handleLogout = () => {
            localStorage.removeItem('@findcep-app/dataFavorites');
            window.location.reload();
          }



    render() {
        // if(true){
        //    this.handleLogout();
        //     return ;
        // }
        const dataFavorites = JSON.parse(localStorage.getItem('@findcep-app/dataFavorites'));
       
        if(dataFavorites !== null && this.state.favorites.length ===0 ){            
            this.setState({...this.state,favorites:dataFavorites});
        }
        else{
            console.log("dataFavorites Vazio");
        }  
        return (
            <Row className="Row">
                <Col sm={3}> 
                    <Col className="left">
                    
                    <Search triggerParentUpdate={this.updateSearch} />
                    
                        <Track events={[this.state.local]} favorite={this.addFavorite} listFavorites={this.state.favorites} />
                    
                        <ListFavorites favorites={this.state.favorites} addFavorite={this.updateSearch}/>
                        

                        
                    </Col>
                </Col>
                <Col  sm={9}>
                    
                    <Map props={this.state.local} />
                    
                </Col>


                
                

            </Row>

        );

    }
}
