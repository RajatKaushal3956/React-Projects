import React, {Component} from "react";

export default class SearchFloatingFilter extends Component {
    constructor(props) {
        super(props);

    }

    valueChanged = (event) => {
        var ref = this.props.frameworkComponentWrapper.agGridReact;
        if(event.target.value != ''){
            let key = this.props.column.colDef.field;
            ref.props.context.componentParent.search(key,event.target.value);
        }
        else{
            ref.props.context.componentParent.refresh();
        }
    };



    render() {
        return (
            <input type="text" onChange={this.valueChanged}/>
        )
    }
}