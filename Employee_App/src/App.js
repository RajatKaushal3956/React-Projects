import React, { Component } from 'react';
import Form from './Form.jsx';
import Grid from './Grid.jsx';
import Header from './Header.jsx';
import Employee from './Employee.jsx';
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            grid:true, //this variable is to display grid in starting default its true
            form_data:'',// form_data is to populate data in form that was fetched from db
            populate_data:false,//this flag is false because we don't want to populate data when user click on true then it sets
            show_Comp:false
        }
        //binding of all methods
        this.ComponentHide = this.ComponentHide.bind(this);
        this.sendData = this.sendData.bind(this);
        this.show = this.show.bind(this);
    }
    show(flag){
        this.setState({show_Comp:flag,grid:true});
    }
    //this function is to fetch data which is populated in form when user press edit button
    sendData(id){
        fetch('http://localhost/Lumen/blog/public/Employee/showById?emp_id=' + id)
        .then(response => response.json())
        .then(form_data => this.setState({ form_data:form_data.data ,populate_data:true,grid:false}))
    }
    //this function is to toggle between to components i.e grid and form
    ComponentHide(flag){
        flag ? this.setState({grid:true,populate_data:false}):this.setState({grid:false})
    }
    render(){
        return(
            <div>
            <Header show={this.show}/>
            {this.state.show_Comp ? this.state.grid ?  <Grid ComponentHide={this.ComponentHide} sendData={this.sendData}/>:<Form ComponentHide={this.ComponentHide} form_data={this.state.form_data} populate_data={this.state.populate_data}/>:<Employee/>}
            </div>
        )}
}
export default App;