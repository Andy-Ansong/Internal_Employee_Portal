import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Employee from "../../model/Employee"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Search } from 'lucide-react'

interface User {
  role: string;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>(localStorage.getItem("sortOrder") ?? "name");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    scrollTo(0,0)
    fetchEmployees();
    fetchUserInfo();
  }, [currentPage, search, sort]);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3030/api/v1/employees?page=${currentPage}&limit=10&name=${search}&sort=${sort}`,{
        headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true
      })
      setEmployees(response.data.employees);
      setTotalCount(response.data.total);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        navigate('/');
      } else {
        setError('Failed to fetch employees');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3030/api/v1/user', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user info', err);
    }
  };

  const handleAddEmployee = () => {
    setIsEditMode(false);
    setCurrentEmployee(null);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const employeeData = Object.fromEntries(formData.entries());

    try {
      const token = localStorage.getItem('token');
      if (isEditMode && currentEmployee) {
        await axios.put(`http://localhost:3030/api/v1/employees/${currentEmployee._id}`, employeeData,{
          headers:{ Authorization: `Bearer ${token}` },
          withCredentials: true
      })
        toast({
          title: "Employee updated",
          description: "The employee record has been successfully updated.",
        });
      } else {
        await axios.post('http://localhost:3030/api/v1/employees', employeeData,{
          headers:{ Authorization: `Bearer ${token}` },
          withCredentials: true
        })
        toast({
          title: "Employee added",
          description: "A new employee record has been successfully created.",
        });
      }
      setIsFormVisible(false);
      fetchEmployees();
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} employee`,
        variant: "destructive",
      });
    }
  };

  const CreateEmployee: React.FC = () => (
    <Card>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={currentEmployee?.name || ''} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={currentEmployee?.email || ''} required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select name="role" defaultValue={currentEmployee?.role || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">{isEditMode ? 'Update' : 'Create'} Employee</Button>
        </form>
      </CardContent>
    </Card>
  );


  const EmployeeListItem: React.FC<{ employee: Employee }> = ({ employee }) => (
    <Card className="mb-4">
      <CardContent className="grid h-[60px] grid-cols-[50px,repeat(3,1fr),1fr,auto] py-[5px] gap-[10px] items-center">
        <div className="w-[50px] h-[50px] rounded-[50%] overflow-hidden">
          <img src={employee.image} alt={employee.name} className="w-full h-full object-cover"/>
        </div>
        <h3 className="text-lg font-semibold text-ellipsis overflow-hidden">{employee.name}</h3>
        <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden">{employee.email}</p>
        <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden hidden md:block">{employee.phoneNumber}</p>
        <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden line-clamp-1">Role: {employee.Department.Role.position}</p>
        <div>
        <div className="cursor-pointer shadow rounded border py-[5px] px-[5px] flex items-center justify-center" onClick={() => navigate(`/employees/${employee._id}`)}>
            View Details
        </div>
        </div>
      </CardContent>
    </Card>
  );
  

  const Pagination: React.FC = () => {
    const totalPages = Math.ceil(totalCount / 10);
    return (
      <div className="flex justify-center space-x-2 mt-4">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between items-center'>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-1">
          <Search className="h-4 w-4" />
          <Input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="w-full border-0 h-8 font-semibold" />
        </div>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <p className="mb-4">Total Employees: {totalCount}</p>
        <div className='bg-white'>
        <Select required name="sort" defaultValue="name" value={sort} onValueChange={(value) => {localStorage.setItem("sortOrder", sort);setSort(value)}}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="-name">Name Z-A</SelectItem>
            <SelectItem value="-Department.Role.startDate">Latest</SelectItem>
            <SelectItem value="Department.Role.startDate">Oldest</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>
      
      
      {(user?.role === 'admin' || user?.role === 'hr') && (
        <Button onClick={handleAddEmployee} className="mb-4">
          <Plus className="mr-2 h-4 w-4" /> Add New Employee
        </Button>
      )}

      {isFormVisible && (
        <div ref={formRef} className="mb-4">
          <CreateEmployee />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : employees.length === 0 ? (
        <p>No employees available.</p>
      ) : (
        employees.map(employee => (
          <EmployeeListItem key={employee._id} employee={employee} />
        ))
      )}

      <Pagination />
    </div>
  );
};

export default Employees;