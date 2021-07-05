import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


    /*class App, es la misma funcion princpal app,pero de tipo "basada en clases"
    "React.component" es como una libreria con muchas funciones, las cual podremos utilizar si las adherimos con "extends"
    */

class App extends React.Component {


    state = {lat: null, errorMessage: ''};

    /* GetCurrentPosition es una funcion de una API que viene en el navegador
    y nos muestra nuestra geolocalizacion basandose en nuestra ip, wifi, etc.
    La info tarda en llegar, no es instantaneo, por lo que lo tenemos que manejar con asincronia y callbacks. 
    La funcion recibe como argumento dos callbacks, uno si funciona y otro si da error.*/


        componentDidMount() {
            window.navigator.geolocation.getCurrentPosition(
                position => this.setState({lat : position.coords.latitude}),
                err => this.setState({ errorMessage: err.message})
                );
            
            }

    renderContent(){
        if (this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <div><Spinner message="Please accept location request" /></div>;
    }
        
    render(){
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    };
}
    

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);