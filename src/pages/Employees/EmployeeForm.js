import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';


import * as employeeService from "../../services/employeeService";
import { ErrorSharp } from '@material-ui/icons';


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female',},
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: '',
    departmentId: '',
    hireDate: " ",
    isPermanent: false,
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        debugger;
        const n_patt = new RegExp(/^[A-Za-z ]+$/);
        const m_patt = new RegExp(/^[0-9]+$/);
        const e_patt = new RegExp(/^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9_-]+([\.a-z0-9_-]+)*(\.[a-z]{2,4})$/);

        let temp = { ...errors }
        if ('fullName' in fieldValues) {
            if (fieldValues.fullName === "") {
                temp.fullName = "This field is required."
            } else if (!n_patt.test(fieldValues.fullName)) {
                temp.fullName = "Please use only a-z or A-Z."
            } else {
                temp.fullName = ""
            }
        }
        if ('email' in fieldValues) {

            if (fieldValues.email === "") {
                temp.email = "This field is required."
            } else if (!e_patt.test(fieldValues.email)) {
                temp.email = "Email invalid. Please use correct email Eg: xyz@email.com"
            } else {
                temp.email = ""
            }

        }
        if ('mobile' in fieldValues) {
            if (fieldValues.mobile === "") {
                temp.mobile = "This field is required."
            } else if (!m_patt.test(fieldValues.mobile)) {
                temp.mobile = "Please use only 0-9."
            } else if (fieldValues.mobile.length > 10) {
                temp.mobile = "Mobile no should not be greater then 10 characters."
            }
            else {
                temp.mobile = ""
            }
        }
        if ('city' in fieldValues) {
            temp.city = fieldValues.city.length != 0 ? "" : "This field is required."
        }
        if ('departmentId' in fieldValues) {
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        }
        if ('gender' in fieldValues) {
            
            temp.gender = fieldValues.gender ?"": "This field is required."
        }
        if("hireDate" in fieldValues){
            if(fieldValues.hireDate==""){
                temp.hireDate="required"
            }
          }
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    
   
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />
                    


                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender "
                        
                        value={values.gender}
                        onChange={handleInputChange}
                        
                        
                        items={genderItems}
                        error={errors.gender}
                        

                    />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                        
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
