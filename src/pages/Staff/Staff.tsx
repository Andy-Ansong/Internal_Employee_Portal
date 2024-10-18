import React, { useEffect, useState } from 'react'
import './styles.css'
import Pagination from '../../components/Pagination/Pagination'
import { Employee } from '../../model/Employee'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import CreateEmployee from '../../components/Forms/CreateEmployee'

const Staff: React.FC = () => {
    const [employees, setEmployees] = useState<Array<Employee>|[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [error, setError] = useState<string>("")
    const limit = 10

    useEffect(() => {
        const page = 1
        axios.get(`http://localhost:3030/api/v1/employees?page=${page}&limit=${limit}`,
            {
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
            ).then(res => {
                setEmployees(res.data.employees)
                setTotal(res.data.total | 0)
                setPage(res.data.page | 0)
            }).catch(err => {
                if(err.status === 401)
                    <Navigate to='auth'/>
                setError(err.response.data.message)
            })
    }, [])

    const fetchPage = (pageNo:number) => {
        axios.get(`http://localhost:3030/api/v1/employees?page=${pageNo}&limit=${limit}`,
            {
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
        ).then(res => {
            setEmployees(res.data.employees)
            setTotal(res.data.total | 0)
            setPage(res.data.page | 0)
        }).catch(err => {
            if(err.status === 401)
                <Navigate to='auth'/>
            setError(err.response.data.message)
        })
    }

    const handleNext = () => {
        if((page * limit) + limit <= total)
            fetchPage(page + 1)
    }
    const handlePrev = () => {
        if(page > 1)
            fetchPage(page - 1)
    }
    const handlePage = (pageNo: number) => {
        if(pageNo != page)
            fetchPage(pageNo)
    }

    return (
        <div className='staff'>
            <h1>Employees</h1>
            <CreateEmployee fetchPage={() => {fetchPage(page)}}/>
            <div className='top'>
                <h3>Total: {total}</h3>
                <button>Add+</button>
            </div>
            {
                employees.length > 0?
                <>
                    <div className='sort-list'>
                        <div></div>
                        <div className='sort-item'>Name</div>
                        <div className='sort-item'>Email</div>
                        <div className='sort-item'>Role</div>
                    </div>
                    <div className='staff-list'>
                        {
                            employees.map((employee, index) => (
                                <div className='employee-list-item' key={index}>
                                    <div className='image-container'>
                                        <img
                                            src={employee.image}
                                        />
                                    </div>
                                    <h3>{employee.name}</h3>
                                    <a href={`mailto:${employee.email}`} id='email' title='Send a message'>{employee.email}</a>
                                    <h4>{employee.Department.Role.position}</h4>
                                    <button>Message</button>
                                </div>
                            ))
                        }
                    </div>
                </>:
                <h3>{error}</h3>
            }

            <Pagination
                currentPage={page} changePage={handlePage}
                nextPage={handleNext} prevPage={handlePrev}
                total={total} limit={limit}/>
        </div>
    )
}

export default Staff