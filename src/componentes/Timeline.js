import React, { Component } from 'react';
import FotoItem from './Foto';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Timeline extends Component {

    constructor(props){
      super(props);
      this.state = {fotos:[]};
      this.login = this.props.login;
    }

    componentWillMount(){
        this.props.store.subscribe(fotos => {
            this.setState({fotos});
      })
    }

    carregaFotos(){  
      let urlPerfil;

      if(this.login === undefined) {
        urlPerfil = `https://cors-anywhere.herokuapp.com/http://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
      } else {
        urlPerfil = `https://cors-anywhere.herokuapp.com/http://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
      }
      this.props.store.lista(urlPerfil);
    }

    componentDidMount(){
      this.carregaFotos();
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.login !== undefined){
        this.login = nextProps.login;
        this.carregaFotos();
      }
    }

    like(fotoId) {
        this.props.store.like(fotoId);      
    }

    comenta(fotoId,textoComentario) {
        this.props.store.comenta(fotoId,textoComentario);
    }

    render(){
        return (
        <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
            {
              this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)}/>)
            }               
        </ReactCSSTransitionGroup>        

        </div>            
        );
    }
}