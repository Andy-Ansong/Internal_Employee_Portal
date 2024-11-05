import { FC, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/model/Employee";
import { Mail, Phone, Cake, MapPin, Calendar, Users, Briefcase } from 'lucide-react';
import axios from 'axios';
import { toast } from "@/components/ui/use-toast"
import EditEmployeeModal from '../../components/Modals/EditEmployeeModal';

const EmployeeProfile: FC<{ employee: Employee; onEdit: () => void, isEditing: boolean }> = ({ employee, onEdit, isEditing }) => {
  const navigate = useNavigate()

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this employee?")
    if(!confirm)return
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3030/api/v1/employees/${employee._id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true}
    ).then(res => {
        console.log(res)
        toast({
          title: "Employee Deleted",
          description: "The employee details have been successfully updated.",
        });
        navigate('/employees')
      })
      .catch(error => {
        console.error("Error updating employee:", error);
        toast({
          title: "Error",
          description: "There was a problem updating the employee details.",
          variant: "destructive",
        });
      });
  }

  return (
    <div className={`container mx-auto p-6 max-w-4xl ${isEditing ? 'h-[1000px]' : ''} overflow-hidden`}>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage className="object-cover" src={employee?.image} alt={employee?.name} />
              {
                employee?.name &&
                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              }
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{employee?.name}</h1>
              <p className="text-muted-foreground mb-4">{employee?.Department?.Role?.position}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {employee.skills && employee?.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{employee?.bio}</p>
              <button onClick={onEdit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button onClick={handleDelete} className="mt-4 ml-3 bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="text-muted-foreground" />
                <span>{employee?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-muted-foreground" />
                <span>{employee?.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cake className="text-muted-foreground" />
                <span>{format(new Date(employee?.birthDate), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-muted-foreground" />
                <span>{employee?.Department?.Role?.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="text-muted-foreground" />
                <span>Position: {employee?.Department?.Role?.position}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground" />
                <span>Start Date: {format(new Date(employee?.Department?.Role?.startDate), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-muted-foreground" />
                <span>Team: {employee?.Department?.Team?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Team Role: {employee?.Department?.Team?.role}</span>
                {employee?.Department?.Team?.isLeader && <Badge>Team Leader</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Work Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {employee?.WorkSchedule.map((schedule, index) => (
              <div key={index} className="text-center p-2 bg-muted rounded-md">
                <div className="font-semibold">{schedule.day}</div>
                <div className="text-sm text-muted-foreground">{schedule.type}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Component() {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        let uri = ""
        if(id){
          uri = `http://localhost:3030/api/v1/employees/${id}`
        }else{
          uri = `http://localhost:3030/api/v1/employees/current`
        }
        const response = await axios.get(uri,{
          headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true
        })
        if (response.data.employee) {
          setEmployee(response.data.employee);
        } else {
          setError('Employee not found');
        }
      } catch (err) {
        console.log(err)
        setError('Failed to fetch employee details');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEdit = async (updatedEmployee: Employee) => {
    try {
      await axios.patch(`http://localhost:3030/api/v1/employees/${id}`, updatedEmployee,{
        headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true
      })
      setEmployee(updatedEmployee);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update employee details');
    }
  };

  if (loading) {
    return <div className="text-center"></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] bg-gray-100 text-gray-800">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">{error}</h2>
        <p className="mb-4">We're sorry, but the employee you are looking for does not exist.</p>
        <p>
          Please check the ID or return to the{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            homepage
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <EmployeeProfile isEditing={isEditing} employee={employee!} onEdit={() => setIsEditing(true)} />
      {isEditing && (
        <EditEmployeeModal
          employee={employee!}
          onClose={() => setIsEditing(false)}
          onSave={handleEdit}
        />
      )}
    </>
  );
}
