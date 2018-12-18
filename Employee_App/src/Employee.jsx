import React , { Component } from 'react';
import './styles.css';
class Employee extends Component{
    constructor(props){
        super(props);
        this.clicked = this.clicked.bind(this);
    }
    clicked(){
        this.props.show(true);
    }
    render(){
        return(
            <div id="message">
                <h1 align="center">Welcome User</h1>
            </div>
        )
    }
}
export default Employee;