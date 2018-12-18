import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './styles.css';
import './icons.css';
import WorkExp_form from './WorkExp_form.jsx';
import Delete from './Delete.jsx';
class WorkExp_grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showExpForm:false,
            context: { componentParent: this },
            columnDefs: [
                { headerName: "Experience(in Years)", field: "experience" },
                { headerName: "Company_Name", field: "company_name" },
                { headerName: "Location", field: "location" },
                { headerName: "Role", field: "role" },
                { headerName: "Delete",field:"delete",cellRendererFramework: Delete}
            ],
            rowData:[]
        }
        this.showform = this.showform.bind(this);
        this.saveDataInGrid = this.saveDataInGrid.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
    }
    showform() {
        this.state.showExpForm ? this.setState({showExpForm:false}):this.setState({showExpForm:true})
    }
    deleteRow(id){
       var rows = this.gridApi.getSelectedRows();
       this.gridApi.updateRowData({remove:rows});
       var obj = this.state.rowData;
       if(id > 0){
            obj.splice(id,1);
       }
       else{
           obj.pop();
       }
       this.setState({rowData:obj});
    }
    fetchData(id){
        fetch('http://localhost/Lumen/blog/public/Employee/gridData?emp_id=' + id)
        .then(response => response.json())
        .then((rowData) =>{
            this.setState({rowData});
         })
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridOptions = params.options;
    }
    saveDataInGrid(data){
        this.setState({rowData:this.state.rowData.concat(data)});
    }
    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '200px',
                    width: '100%',
                }}
                >
                {this.state.showExpForm ? <WorkExp_form showform={this.showform} saveData={this.saveDataInGrid}/>: null}
                <div className="grid-heading">
                    <div id="grid-name">Work Experience:</div>
                    <button className="add-work-exp" onClick={this.showform}></button>
                </div>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    context={this.state.context}
                    rowSelection={'single'}
                    onGridReady={this.onGridReady}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        )
    }
}
export default WorkExp_grid;