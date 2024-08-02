import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",


    })
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/auth/category")
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                }
                else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        axios.get("http://localhost:3000/auth/employee/" + id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    category_id: result.data.Result[0].category_id,
                })
            })
            .catch(err => console.log(err))
    }, [])
    const { id } = useParams()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3000/auth/edit_employee/" + id, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate("/dashboard/employee")
                }
                else {
                    alert(result.data.Error)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (

        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rouded w-50 border'>
                <h2 className='text-center'>Edit Employee</h2>
                <form class="row g-1" onSubmit={handleSubmit}>
                    <div class="col-12">
                        <label for="inputName" class="form-label">Name
                        </label>
                        <input type="text" class="form-control" id="inputName" placeholder='Enter Name' value={employee.name} autoComplete='off'
                            onChange={e => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>
                    <div class="col-12">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                            onChange={e => setEmployee({ ...employee, email: e.target.value })} value={employee.email} />
                    </div>

                    <div class="col-12">
                        <label for="inputSalary" class="form-label">Salary</label>
                        <input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
                            onChange={e => setEmployee({ ...employee, salary: e.target.value })} value={employee.salary} />
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
                            onChange={e => setEmployee({ ...employee, address: e.target.value })} value={employee.address} />
                    </div>
                    <div class="col-12">
                        <label for="category_id" class="form-label">Category</label>
                        <select name="category_id" id="category_id" className='form-select' onChange={e => setEmployee({ ...employee, category_id: e.target.value })}>
                            {category.map(c => {
                                return <option value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>

                    <div class="col-12">
                        <button type="submit" class="btn btn-primary w-100">Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee
