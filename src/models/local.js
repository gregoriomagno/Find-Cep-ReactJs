export default class Local{
    constructor({cep ,lat,lng, publicPlace,district,location,uf,favorite }){
        this.cep = cep;
        this.lat = lat;
        this.lng = lng;
        this.publicPlace = publicPlace;
        this.district = district;
        this.location = location;
        this.uf = uf;
        this.favorite = favorite; 
    }
}