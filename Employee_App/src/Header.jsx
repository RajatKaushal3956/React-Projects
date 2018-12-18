import React , { Component } from 'react';
import './styles.css';
class Header extends Component{
    constructor(props){
        super(props);
        this.clicked = this.clicked.bind(this);
    }
    clicked(event){
        if(event.target.tagName == 'IMG'){
            this.props.show(false);
        }
        else{
            this.props.show(true);
        }
    }
    render(){
        return(
            <div className="header">
                <img src={require('./company-logo.png')} className="header-image" onClick={this.clicked}></img>
                <div className="header-options-div">
                    <span className="header-options" align="center" onClick={this.clicked}>Employees</span>
                    <span className="header-options" align="center">Leaves</span>
                </div>
            </div>
        )
    }
}
export default Header;