import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import JqxInput from './assets/jqwidgets-react/react_jqxinput.js';
import './assets/jqwidgets/styles/jqx.energyblue.css';
import JqxButton from './assets/jqwidgets-react/react_jqxbuttons.js';
import JqxNumberInput from './assets/jqwidgets-react/react_jqxnumberinput.js';
import './icons.css';

class WorkExp_form extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible : true
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        this.refs.submit.on('click',(event)=>{
            let data = {
            company_name: this.refs.company_name.val(),
            location: this.refs.location.val(),
            experience: this.refs.experience.val(),
            role: this.refs.role.val(),
            }
            this.props.saveData(data);
            this.closeModal();
        });
    }
    openModal() {
        this.setState({
            visible : true
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
        this.props.showform();
    }
    render(){
        return(
            <div>
             <Modal visible={this.state.visible} width="400" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Company Name:</td>
                                    <td><JqxInput placeHolder={'Enter Company Name'} width={200} ref="company_name"></JqxInput></td>
                                </tr>
                                <tr>
                                    <td>Experience(in Years):</td>
                                    <td><JqxNumberInput ref="experience" inputMode={'simple'} value={0} decimalDigits={0} textAlign={'left'}></JqxNumberInput></td>
                                </tr>
                                <tr>
                                    <td>Location:</td>
                                    <td><JqxInput width={200} ref='location' placeHolder={"Enter Company Location"}></JqxInput></td>
                                </tr>
                                <tr>
                                    <td>Role:</td>
                                    <td><JqxInput width={200} ref='role' placeHolder={"Enter Your Role in Company"}></JqxInput></td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <div align="center">
                                            <br/>
                                            <JqxButton className="jqx-fill-state-hover-energyblue submit-button" ref='submit' height={30} width={90} value="Submit" />
                                        </div>  
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={this.closeModal} className="close-button"></button>
                    </div>
                </Modal>
            </div>
        )
    }
} 
export default WorkExp_form;