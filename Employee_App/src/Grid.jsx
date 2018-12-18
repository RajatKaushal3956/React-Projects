import React, { Component } from 'react';

import Modal from 'react-awesome-modal';
import { AgGridReact } from 'ag-grid-react';
import WorkExp_gridView from "./WorkExp_gridView";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import $ from 'jquery';
import Delete from './Delete.jsx';
import Edit from './Edit.jsx';
import View from './View.jsx';
import SearchFloatingFilter from "./searchFloatingFilter.jsx";
import './icons.css';
class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Name', // for giving name to radio button
            dept: 'Department', //for giving name to radio button which is used in quick search
            Page: '', // for Page Number
            context: { componentParent: this }, //to store refrence of grid component
            key: '', //for storing field name
            value: '', //for storing value of particular field
            count: '', //total no of docs
            prevGridData:[],
            columnDefs: [
                {
                    headerName: "Name", field: 'name', editable: true, width: 100, floatingFilterComponent: "searchFloatingFilter",
                    floatingFilterComponentParams: {
                        suppressFilterButton: true
                    }
                },
                {
                    headerName: "Nationality", field: 'nationality', width: 130, cellStyle: {
                        textAlign: 'center'
                    }, floatingFilterComponent: "searchFloatingFilter",
                    floatingFilterComponentParams: {
                        suppressFilterButton: true
                    }
                },
                {
                    headerName: "Gender", field: 'gender', width: 100, floatingFilterComponent: "searchFloatingFilter",
                    floatingFilterComponentParams: {
                        suppressFilterButton: true
                    }
                },
                {
                    headerName: "Date of Joining", field: 'joining_date', width: 180, cellStyle: {
                        textAlign: 'center'
                    }, floatingFilterComponent: "searchFloatingFilter",
                    floatingFilterComponentParams: {
                        suppressFilterButton: true
                    }
                },
                {
                    headerName: "Mobile", field: 'mobile', width: 110, tooltip: (params) => 'Mobile: ' + params.value,
                    floatingFilterComponent: "searchFloatingFilter",
                    floatingFilterComponentParams: {
                        suppressFilterButton: true
                    }
                },
                {
                    headerName: "Age", field: 'age', width: 80, suppressFilter: true
                },
                {
                    headerName: "Languages Known", field: 'languages', width: 180,
                    floatingFilterComponent: "searchFloatingFilter",
                    floatingFilterComponentParams: {
                        suppressFilterButton: true
                    }
                },
                {
                    headerName: "Department", field: 'department', width: 160,
                    floatingFilterComponent: "searchFloatingFilter",
                    floatingFilterComponentParams: {
                        suppressFilterButton: true
                    }
                },
                {
                    headerName: "Work Exp", field: 'work_exp', cellRendererFramework: View, cellStyle: {
                        textAlign: 'center'
                    }, width: 95, suppressFilter: true, suppressSorting: true
                },
                {
                    headerName: "Edit", field: 'edit', cellRendererFramework: Edit, cellStyle: {
                        textAlign: 'center'
                    }, width: 70, suppressFilter: true, suppressSorting: true
                },
                {
                    headerName: "Delete", field: 'delete', cellRendererFramework: Delete, cellStyle: {
                        textAlign: 'center'
                    }, width: 80, suppressFilter: true, suppressSorting: true
                }
            ],
            frameworkComponents: {
                searchFloatingFilter: SearchFloatingFilter
            },
            pageSize: 5 //for contents per page
            
        }
        //binding of all methods goes here
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.clickedSearch = this.clickedSearch.bind(this);
        this.refresh = this.refresh.bind(this);
        this.insert = this.insert.bind(this);
        this.onCellValueChanged = this.onCellValueChanged.bind(this);
        this.apiRequest = this.apiRequest.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
        this.search = this.search.bind(this);
        this.resetSearchFilter = this.resetSearchFilter.bind(this);
        this.jumpPage = this.jumpPage.bind(this)
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
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridOptions = params.options;
    }
    //this method is for update and delete for api request
    apiRequest(urlPart, values) {
        $.ajax({
            url: "http://localhost/Lumen/blog/public/Employee" + urlPart,
            type: 'PUT',
            data: values,
            success: function (response) {
                this.refresh();
                console.log(response);
            }.bind(this),
            fail: function (response) {
                console.log(response);
            }
        })
    }
    //this method is to delete row when user clicks on delete record
    deleteRow(id) {
        let urlPart = '/delete';
        let values = {
            emp_id: id
        }
        this.apiRequest(urlPart, values);
    }
    //this method handles pagination
    jumpPage(event) {
        if (event.target.name == 'next') {
            if (this.state.count.innerHTML == this.state.Page.innerHTML) {
                return;
            }
            this.state.Page.innerHTML = parseInt(this.state.Page.innerHTML) + 1;
        }
        else {
            if (this.state.Page.innerHTML == '1') {
                return;
            }
            this.state.Page.innerHTML = parseInt(this.state.Page.innerHTML) - 1;
        }
        this.refresh();
    }
    //this method when user click on edit button this method calls
    editRow(id) {
        this.props.sendData(id); //sending id of row to fetch data from db and to populate the form
    }
    viewGrid(id){
        this.openModal();
        this.refs.work_exp.fetchData(id);
    }
    componentDidMount() {
        this.setState({ Page: document.getElementById('page'), count: document.getElementById('pages') });
        this.refresh();
        document.getElementById('name').checked = true;

    }
    //this method is to send data entered by user on quick search bar and also handled empty field entered by user
    clickedSearch() {
        let key;
        { document.getElementById('name').checked ? key = document.getElementById('name').value : key = document.getElementById('dept').value }
        let value = (document.getElementById('value').value).trim();
        if (value.length == 0) {
            alert('Search Field Empty');
            return;
        }
        document.getElementById('value').value = '';
        this.search(key, value);
    }
    //this method is to fetch data from db and display on grid
    refresh() {
        fetch('http://localhost/Lumen/blog/public/Employee/data?page=' + this.state.Page.innerHTML)
            .then(result => result.json())
            .then((rowData) => {
                if (rowData.data == '' && this.state.Page.innerHTML > 1) {
                    this.state.Page.innerHTML = this.state.Page.innerHTML - 1;
                    this.refresh();
                    this.setState({ rowData: rowData.data });
                    return;
                }
                this.setState({ rowData: rowData.data });
                if (rowData.count == 0) {
                    this.state.Page.innerHTML = 0;
                    this.state.count.innerHTML = Math.ceil(rowData.count / 5);
                    return;
                }
                this.state.count.innerHTML = Math.ceil(rowData.count / 5);
            })
    }
    //when user click on particular cell of grid to edit then this method calls
    onCellValueChanged(params) {
        let values = {
            _id: params.data._id,
            fieldname: params.colDef.field,
            value: params.newValue
        }
        $.ajax({
            url: "http://localhost/Lumen/blog/public/Employee/update",
            type: 'PUT',
            data: values,
            success: function (response) {
                console.log(response);
                this.refresh();
            }.bind(this),
            fail: function (response) {
                console.log(response);
            }
        })
    }
    //when user wants to insert record then this method calls
    insert() {
        this.props.ComponentHide(false); //sending false to display form instead of grid
    }
    //when user want to search for name or department and if user searches through filter also
    search(key, value) {
        fetch('http://localhost/Lumen/blog/public/Employee/search?' + 'key' + '=' + key + '&' + 'value' + '=' + value)
            .then(response => response.json())
            .then((rowData) => {
                this.setState({ rowData: rowData.data })
                if (rowData.count == 0) {
                    this.state.Page.innerHTML = 0;
                }
                this.state.count.innerHTML = Math.ceil(rowData.count / 5);
            });
    }
    //to reset the search filter
    resetSearchFilter() {
        this.refresh();
    }
    render() {
        return (
            <div>
                <Modal visible={this.state.visible} width="800" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                   <WorkExp_gridView ref="work_exp"/>
                </Modal> 
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '450px',
                        width: '100%',
                        marginTop: '20px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                    >
                    <div className='menu-bar' align="right">
                        <button className="insert" onClick={this.insert}></button>
                        <div className="search-box">
                            <input type="text" id='value' placeholder="Search" />
                            <button className="search-button" onClick={this.clickedSearch}></button>
                            <div>
                                <input type="radio" id="name" name='type' value="name" />Name
                                <input type="radio" id="dept" name='type' value="department" />Department
                            </div>
                        </div>
                        <button className="reset-button" onClick={this.resetSearchFilter}></button>
                    </div>
                    <AgGridReact
                        enableEditing={true}
                        enableFilter={true}
                        enableSorting={true}
                        frameworkComponents={this.state.frameworkComponents}
                        context={this.state.context}
                        onGridReady={this.onGridReady}
                        columnDefs={this.state.columnDefs}
                        pagination={true}
                        floatingFilter={true}
                        paginationPageSize={this.state.pageSize}
                        suppressPaginationPanel={true}
                        suppressScrollOnNewData={true}
                        onCellValueChanged={this.onCellValueChanged}
                        frameworkComponents={this.state.frameworkComponents}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                    <span id='page'>1</span>
                    <span id='of__Page'>of</span>
                    <span id='pages'>1</span>
                    <div id='page-buttons'>
                        <button className="prev__button" name='prev' onClick={this.jumpPage}></button>
                        <button className="next__button" name='next' onClick={this.jumpPage}></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Grid;