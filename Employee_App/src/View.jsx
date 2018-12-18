import React, { Component } from "react";

import './icons.css';
//View button component
class View extends Component {
    //this method invokes parent's method
    invokeParentMethod = () => {
        var id = this.props.data.emp_id;
        this.props.context.componentParent.viewGrid(id); //calling parent's method editRow
    }
    render() {
        return (
            <div>
                <button  className="view" onClick={this.invokeParentMethod}>    
                </button>

            </div>
        );
    }
};

export default View;