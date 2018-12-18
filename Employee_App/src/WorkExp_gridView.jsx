import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './styles.css';
import './icons.css';
class WorkExp_gridView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "Experience(in Years)", field: "experience" },
                { headerName: "Company_Name", field: "company_name" },
                { headerName: "Location", field: "location" },
                { headerName: "Role", field: "role" },
            ],
            rowData:[]
        }
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(id){
        fetch('http://localhost/Lumen/blog/public/Employee/gridData?emp_id=' + id)
        .then(response => response.json())
        .then((rowData) =>{
            this.setState({rowData});
         })
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
                <div className="grid-heading">
                    <div id="grid-name">Work Experience:</div>
                </div>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        )
    }
}
export default WorkExp_gridView;