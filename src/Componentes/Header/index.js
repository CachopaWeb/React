import React from 'react';
import { Component } from 'react';
import api from '../../Services';

export default class Header extends Component{
    state = {
        ceps: {}
    }
    componentDidMount(){
        this.buscaCeps('79700000');
    }

    buscaCeps = async (cep) => {
        try{
            let response = await api.get(`/${cep}/json/`);
            console.log(response)
            if (!response.data.erro){
                this.setState({ceps: response.data});
            }else{
                alert('nada encontrado')
            }
        }
        catch(error){
            alert(error)
        }

    }

    buscar = () =>{
        const edtcep = document.getElementById('edtcep');
        this.buscaCeps(edtcep.value);
    }

    render(){
        const { cep, uf, localidade, logradouro } = this.state.ceps;
        return (
            <div className="container">
                <div>
                    <p>
                        <label>CEP</label>
                        <input id="edtcep" type="text" placeholder="Informe um Cep"></input>
                    </p>
                    <button id="btnBuscar" onClick={this.buscar}>Buscar</button>
                </div>
                <article>
                    <p>{cep}</p>
                    <p>{uf}</p>
                    <p>{localidade}</p>
                    <p>{logradouro}</p>
                </article>
            </div>
        )
    }   
}