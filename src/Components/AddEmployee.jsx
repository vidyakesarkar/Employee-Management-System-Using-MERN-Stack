import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {
    const [employee,setEmployee]=useState({
        name:"",
        email:"",
        password:"",
        salary:"",
        address:"",
        category_id:"",
        image:""
        
    })
    const navigate=useNavigate();
    
    const [category,setCategory]=useState([]);
    useEffect(()=>{
     axios.get("http://localhost:3000/auth/category")
     .then(result=>{
        if( result.data.Status){
            setCategory(result.data.Result)
        }
        else{
            alert(result.data.Error)
        }
     })
     .catch(err=>console.log(err))
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",employee.name)
        formData.append("email",employee.email)
        formData.append("password",employee.password)
        formData.append("address",employee.address)
        formData.append("salary",employee.salary)
        formData.append("image",employee.image)
        formData.append("category_id",employee.category_id)
        axios.post("http://localhost:3000/auth/add_employee",formData)
    
        .then(result=>{
            if(result.data.Status){
                navigate('/dashboard/employee')
            }
            else{
                alert(result.data.Error)
            }
        })
        .catch(err=>console.log(err))
    }
  return (
  <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rouded w-50 border'>
        <h2 className='text-center'>Add Employee</h2>
        <form class="row g-1 " onSubmit={handleSubmit}>
            <div class="col-12">
                <label for="inputName" class="form-label">Name</label>
                <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                onChange={e => setEmployee({...employee, name: e.target.value})}
                />
            </div>
            <div class="col-12">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
               onChange={e => setEmployee({...employee, email: e.target.value})} />
            </div>
            <div class="col-12">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
               onChange={e => setEmployee({...employee, password: e.target.value})} />
            </div>
            <div class="col-12">
                <label for="inputSalary" class="form-label">Salary</label>
                <input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
                onChange={e => setEmployee({...employee, salary: e.target.value})}/>
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
                onChange={e => setEmployee({...employee, address: e.target.value})}/>
            </div>
            <div class="col-12">
                <label for="category_id" class="form-label">Category</label>
                <select name="category_id" id="category_id" className='form-select' onChange={e => setEmployee({...employee, category_id: e.target.value})}>
                    {category.map(c=>{
                        return <option value={c.id}>{c.name}</option>
                    })}
                </select>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label" for="inputGroupFile01">Select Image</label>
                <input type="file" class="form-control" id="inputGroupFile01" name="image"
               onChange={e => setEmployee({...employee, image: e.target.files[0]})} />
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary w-100">Add Employee</button>
            </div>
        </form>
    </div> 
    </div>
  )
}

export default AddEmployee
