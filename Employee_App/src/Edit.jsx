import React, { Component } from "react";
import './icons.css';
//Edit button component
class Edit extends Component {
    //this method invokes parent's method
    invokeParentMethod = () => {
        var id = this.props.data.emp_id;
        this.props.context.componentParent.editRow(id); //calling parent's method editRow
    }
    render() {
        return (
            <div>
                <button  className="edit" onClick={this.invokeParentMethod}>    
                </button>

            </div>
        );
    }
};

export default Edit;