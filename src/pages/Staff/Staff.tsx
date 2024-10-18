import React, { useEffect, useState } from 'react'
import './styles.css'
import Pagination from '../../components/Pagination/Pagination'
import { Employee } from '../../model/Employee'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Staff: React.FC = () => {
    const [employees, setEmployees] = useState<Array<Employee>|[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const page = 1
        axios.get(`http://localhost:3030/api/v1/employees?page=${page}`,
            {
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
        ).then(res => {
            console.log(res.data)
            setEmployees(res.data.employees)
            setTotal(res.data.total | 0)
            setPage(res.data.page | 0)
        }).catch(err => {
            if(err.status === 401)
                <Navigate to='auth'/>
            setError(err.response.data.message)
        })
    }, [])

    const handleNext = () => {}
    const handlePrev = () => {}
    const handlePage = () => {}

    return (
        <div className='staff'>
            <h1>Staff</h1>
            <h3>Total: {total}</h3>
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
                                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAKxABAAIBAwMCBQQDAAAAAAAAAAECAwQRURIhMTJBBSNhkbFicXKBIjRS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrgAAAAAAAAAAAAAAAABMxEbz4GbqtTOWZrXtj45BYza2le2OOuefZUyajLk83nbiOyIMHeq3/U/d6rmyV9OS0f28Bgt4dbaLfO715iF6lotXqrO8csZLpc04cn6Z7SDVCPp4AAAAAAAAAAAHXAEepv0YLW99toZLQ+IT8mkfqZ6wAAAAD2CCjXwW68NLcw9odHO+np9I2TIAAAAAAAAAAAAKvxCN8NZ4sz134heY2x7RtMb7qSwAAAAACjS0P8Ar1/v8rCpoMk2pasxH+PhcQcAAAAAAAAAAJ8ACj8Sj/Kk/SYU2lrMVsmKIpG81tuzZiYmYntPCwAAAAAdrWbTERG8z4KLvw6Pl3nmYXEWlxzjwVraNreZSoAAAAAAAAAAAADK1VOjUXjmd2qra3D14+uPVWPvAM4BQAAWNBWZz9XtWFdp6LH0YYmfNu8lE8eAEAAAAAAAAAAAAB4zz8m/8Z/DuS8Y6Ta3iFDPq7ZYmtYitJ+8gqx4dBQAA9mvgn5NP4x+GQs4NXbFWK2iJrH3go0R5x3jJSLV8S9IAAAAAAAAAhy6nFina1t54jur319p9FNv3kF5Dl1WPH2meqeIZ+TPkyeq87ceEZgnz6m+aJie1eIQAoAAAAAAnwam+GIiO9eJXcWqx5O0T0zxLLEwbQycefJj9N5248rFNfaPXTf9pMF4Q4tTiyztW208T2TAAAK2tyWpjiKzt1eZAGcAQAFAAAAAAAAAAAABo6LJa+OYtO/T4kEFkAH/2Q=="
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
                total={total}/>
        </div>
    )
}

export default Staff