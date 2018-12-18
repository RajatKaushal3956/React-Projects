import React, { Component } from 'react';
import JqxInput from './assets/jqwidgets-react/react_jqxinput.js';
import JqxNumberInput from './assets/jqwidgets-react/react_jqxnumberinput.js';
import JqxComboBox from './assets/jqwidgets-react/react_jqxcombobox.js';
import JqxButton from './assets/jqwidgets-react/react_jqxbuttons.js';
import JqxDateTimeInput from './assets/jqwidgets-react/react_jqxdatetimeinput.js';
import JqxDropDownList from './assets/jqwidgets-react/react_jqxdropdownlist.js';
import JqxTooltip from './assets/jqwidgets-react/react_jqxtooltip.js';
import './assets/jqwidgets/styles/jqx.energyblue.css';
import './assets/jqwidgets/styles/jqx.darkblue.css';
import './styles.css';
import $ from 'jquery';
import WorkExp_grid from './WorkExp_grid.jsx';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnDefs:[
                { headerName: "Experience(in Years)" ,field:"experince", width:100},
                { headerName: "Company_Name", field:"company_name", width:100},
                { headerName: "Location", field:"location", width:100}
            ]
        }
        //binding of all methods
        this.validationsAndGenerateData = this.validationsAndGenerateData.bind(this);
    }
    //this method is for validations and to generate data which is to be send to database for updation or deletion
    validationsAndGenerateData() {
        let emp_name = this.refs.name.val().trim();
        let emp_mobile = this.refs.mobile.val() + '';
        let emp_age = this.refs.age.val();
        let emp_gender = this.refs.gender.val();
        let emp_nationality = this.refs.nationality.val();
        let emp_houseno = this.refs.HouseNo.val();
        let emp_street = this.refs.Street.val().trim();
        let emp_city = this.refs.City.val().trim();
        let emp_state = this.refs.State.val().trim();
        let emp_joining_date = this.refs.joining_date.val();
        let emp_languages = this.refs.language.getSelectedItems().map(function iterator(lang) {
            return lang.value
        });
        let emp_department = this.refs.department.val();
        /**
         * Handling empty text cases
         */
        if (emp_name.length == 0) {
            alert("name can't be empty");
            return -1;
        }
        if (emp_mobile.length < 10) {
            alert("mobile no is invalid");
            return -1;
        }
        if (emp_age.length == 0) {
            alert("age can't be empty");
            return -1;
        }
        if (emp_street.length == 0) {
            alert("street can't be empty");
            return -1;
        }
        if (emp_city.length == 0) {
            alert("city can't be empty");
            return -1;
        }
        if (emp_state.length == 0) {
            alert("state can't be empty");
            return -1;
        }
        if (emp_languages.length == 0) {
            alert("Please select atleast one language");
            return -1;
        }
        if (emp_department.length == 0) {
            alert("Please select department");
            return -1;
        }
        //generating data to send to database
        let data = {
            name: emp_name,
            mobile: emp_mobile,
            age: emp_age,
            gender: emp_gender,
            address: {
                HouseNo: emp_houseno,
                street: emp_street,
                city: emp_city,
                state: emp_state
            },
            nationality: emp_nationality,
            joining_date: emp_joining_date,
            languages: emp_languages,
            department: emp_department,
            work_exp: this.refs.work_exp.state.rowData
        }
        return data;
    }
    componentDidMount() {
        //when user presses edit button populate_data flag sets
        if (this.props.populate_data) {
            this.refs.submit.val('Update');
            this.refs.name.val(this.props.form_data.name);
            this.refs.mobile.val(this.props.form_data.mobile);
            this.refs.age.val(this.props.form_data.age);
            this.refs.HouseNo.val(this.props.form_data.address.HouseNo);
            this.refs.Street.val(this.props.form_data.address.street);
            this.refs.City.val(this.props.form_data.address.city);
            this.refs.State.val(this.props.form_data.address.state);
            this.refs.gender.val(this.props.form_data.gender);
            this.props.form_data.languages.map((item) => {
                this.refs.language.selectItem(item);
            })
            this.refs.nationality.val(this.props.form_data.nationality);
            this.refs.department.val(this.props.form_data.department);
            this.refs.joining_date.val(this.props.form_data.joining_date);
            this.refs.work_exp.saveDataInGrid(this.props.form_data.work_exp);
        }
        //when user want to show emp data i.e grid
        this.refs.Show.on('click', (e) => {
            this.props.ComponentHide(true);
        })
        //when user submit or click on update button then handles here
        this.refs.submit.on('click', (e) => {
            var data = this.validationsAndGenerateData();
            //if data is invalid
            if (data == -1)
                return;
            //if user wants to populate_data in form by clicking edit button
            if (this.props.populate_data) {
                data.emp_id = this.props.form_data.emp_id;
                $.ajax({
                    url: "http://localhost/Lumen/blog/public/Employee/updateRow",
                    type: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        this.refs.submit.val('Submit');
                        this.props.ComponentHide(true);
                    }.bind(this),
                    fail: function (response) {
                        console.log(response);
                    }
                })
            }
            //else insert data in db
            else {
                $.ajax({
                    url: "http://localhost/Lumen/blog/public/Employee/insert",
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        this.props.ComponentHide(true);
                    }.bind(this),
                    fail: function (response) {
                        console.log(response);
                    }
                })
            }

        })
    }
    render() {
        /**
         * countries array 
         * language array
         * department array
         * and gender array for suggestions
         */
        let countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
        let languages = ["C", "C++", "Python", "React JS", "Node JS", "React Native", "JavaScript", "PHP", "Ruby", "Pearl"];
        let departments = ['Android', 'Testing and Maintenance', 'Manager', 'Human Resource', 'IOS', 'IMS', 'CMMS', 'Checkpoint', 'Common-Module'];
        let gender = ['Male', 'Female', 'Other'];
        return (
            <div>
                <table align="center" className="tb">
                    <tbody>
                        <tr className="tr">
                            <td>Name:</td>
                            <td>
                                <JqxTooltip
                                    position={'mouse'} name={'movieTooltip'}
                                    content={'Name'}>
                                    <JqxInput width={220} ref='name' placeHolder={'Enter Your Name'}/>
                                </JqxTooltip>
                            </td>
                            <td className="table-second-column-field">Mobile:</td>
                            <td>
                                <JqxTooltip
                                        position={'mouse'} name={'movieTooltip'}
                                        content={'Mobile'}> 
                                    <JqxNumberInput width={220} ref='mobile' inputMode={'simple'} digits={10} max={9999999999} value={1} decimalDigits={0} textAlign={'left'} />
                                </JqxTooltip>
                            </td>
                        </tr>
                        <tr className="tr">
                            <td>Age:</td>
                            <td>
                                 <JqxTooltip
                                    position={'mouse'} name={'movieTooltip'}
                                    content={'Age'}>
                                    <JqxNumberInput width={220} min={20} ref='age' max={70} inputMode={'simple'} value={20} decimalDigits={0} textAlign={'left'} />
                                </JqxTooltip>
                            </td>
                            <td className="table-second-column-field">Gender:</td>
                            <td>
                                <JqxDropDownList ref='gender' selectedIndex={0} width={220} height={30} source={gender} dropDownHeight={85} />
                            </td>
                        </tr>
                        <tr className="tr">
                            <td>Nationality:</td>
                            <td><JqxComboBox width={220} source={countries} ref='nationality' selectedIndex={0} /></td>
                            <td className="table-second-column-field">Date of Joining:</td>
                            <td><JqxDateTimeInput width={220} ref='joining_date' className="jqx-icon-calendar-darkblue" /></td>
                        </tr>
                        <tr className="tr">
                            <td>Address:</td>
                            <td>
                                <JqxTooltip
                                    position={'mouse'} name={'movieTooltip'}
                                    content={'House.No/Flat No./Block No.'}>
                                    <JqxNumberInput  width={40} min={1} value={1} ref='HouseNo'  inputMode={'simple'} decimalDigits={0} textAlign={'left'} />
                                </JqxTooltip>
                            </td>
                            <td className="table-second-column-field">Languages Known:</td>
                            <td>
                                <JqxComboBox ref="language" width={220} source={languages} selectedIndex={0} multiSelect={true} />
                            </td>
                        </tr>
                        <tr className="tr">
                            <td></td>
                            <td><JqxInput  className="address" placeHolder={"Street"} width={220} ref="Street" /></td>
                        </tr>
                        <tr className="tr">
                            <td></td>
                            <td>
                                <JqxInput placeHolder={"City"} width={80} ref='City' />
                                &emsp;
                                <JqxInput placeHolder={"State"} width={124} ref="State" />
                            </td>
                            <td className="table-second-column-field">Department:</td>
                            <td>
                                <JqxDropDownList placeHolder={"Select Department"} ref='department' width={220} height={30} source={departments} />
                            </td>
                        </tr>
                        <tr className="tr">
                            <td colSpan="5">
                               <WorkExp_grid  ref="work_exp"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <br/>
                                <br />
                                <div align="center">
                                    <JqxButton className="jqx-fill-state-hover-energyblue submit-button" ref='submit' height={30} width={90} value="Submit" />
                                    <JqxButton className="show-button" height={30} width={90} ref="Show" value="Show" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Form;