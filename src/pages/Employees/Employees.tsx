import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import Pagination from '../../components/Pagination/Pagination'
import { Employee } from '../../model/Employee'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CreateEmployee from '../../components/Forms/CreateEmployee'
import { User } from '../../model/User'
import EmployeeListItem from '../../components/EmployeeListItem/EmployeeListItem'

const Staff: React.FC = () => {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const formRef = useRef<HTMLDivElement>(null)
    const [employees, setEmployees] = useState<Array<Employee>|[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [user, setUser] = useState<User|null>(null)
    const [error, setError] = useState<string>("")
    const [task, setTask] = useState<string>("create")
    const [clickedUser, setClickedUser] = useState<Employee|null>()
    const limit = 10
    const navigate = useNavigate()

    const handleFormOpen = (state:boolean) => {
        if(!formRef.current)
            return
        setOpenForm(state)
        console.log(openForm)
        if(state){
            formRef.current.style.right = "-20px";
        }else{
            formRef.current.style.right = "-350px";
        }
    }

    useEffect(() => {
        const startPage = page | 1
        axios.get(`http://localhost:3030/api/v1/employees?page=${startPage}&limit=${limit}`,
            {
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`},
                withCredentials: true
            }
            ).then(res => {
                setEmployees(res.data.employees)
                setTotal(res.data.total | 0)
                setPage(res.data.page | 0)
                setUser(res.data.user)
                console.log(res.data)
            }).catch(err => {
                if(err.status === 401)
                    navigate('/auth')
                setError(err.response.data.message)
            })
    }, [page, navigate])

    const fetchPage = (pageNo:number) => {
        axios.get(`http://localhost:3030/api/v1/employees?page=${pageNo}&limit=${limit}`,
            {
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`},
                withCredentials: true
            }
        ).then(res => {
            setEmployees(res.data.employees)
            setTotal(res.data.total | 0)
            setPage(res.data.page | 0)
        }).catch(err => {
            if(err.status === 401)
                navigate('/auth')
            setError(err.response.data.message)
        })
    }

    const handleNext = () => {
        if(page < total / limit)
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

    const handleCreateEmployee = () => {
        setTask("create")
        setClickedUser(null)
        handleFormOpen(true)
    }

    const handleEditEmployee = (id: string) => {
        setTask("edit")
        setClickedUser(employees.find(emp => emp._id == id))
        handleFormOpen(true)
    }
    
    const deleteEmployee = (id: string) => {
        axios.delete(`http://localhost:3030/api/v1/employees/${id}`,
            {
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`},
                withCredentials: true
            }
        ).then(() => {
            // setEmployees(employees.filter(employee => employee._id != id))
            setTotal(total-1)
        }).catch(err => {
            if(err.status === 401)
                navigate('/auth')
            setError(err.response.data.message)
        })
    }

    return (
        <div className='staff'>
            <h1>Employees</h1>
            <CreateEmployee
                formRef={formRef}
                task={task}
                clickedUser={clickedUser}
                handleFormOpen={handleFormOpen}
                fetchPage={() => {fetchPage(page)}}
            />
            <div className='top'>
                <h3>Total: {total}</h3>
                {
                    (user && ["admin", "hr"].includes(user.role)) &&
                    <button onClick={handleCreateEmployee}>Add+</button>
                }
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
                    <div className={`staff-list`}>
                        {
                            employees.map((employee, index) => (
                                <EmployeeListItem
                                    employee={employee}
                                    user={user}
                                    key={index}
                                    handleEditEmployee={handleEditEmployee}
                                    deleteEmployee={deleteEmployee}/>
                            ))
                        }
                    </div>

                    <Pagination
                        currentPage={page} changePage={handlePage}
                        nextPage={handleNext} prevPage={handlePrev}
                        total={total} limit={limit}/>
                </>:
                <h3>{error}</h3>
            }
        </div>
    )
}

export default Staff