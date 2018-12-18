import React, { Component } from "react";
import './icons.css';
class Delete extends Component {

    invokeParentMethod = () => {
        let id;
       if(this.props.data.hasOwnProperty('emp_id')){
        id = this.props.data.emp_id;
       
       }
       else{
           id = this.props.rowIndex;
       }
       this.props.context.componentParent.deleteRow(id-1);
        
    }
    render() {
        return (
            <div>
                <button className="delete" onClick={this.invokeParentMethod}>
                </button>
            </div>
        );
    }
};

export default Delete;