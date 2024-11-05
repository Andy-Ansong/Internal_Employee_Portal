import React, { useState } from 'react';
import { Employee } from '@/model/Employee';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Plus, X } from 'lucide-react';
import axios, { AxiosError } from 'axios';

const AddEmployeePage: React.FC = () => {
  const formInitialState = {
    name: '',
    email: '',
    bio: '',
    phoneNumber: '',
    gender: '',
    birthDate: new Date(),
    skills: [],
    Department: {
      Role: {
        position: '',
        location: '',
        startDate: new Date(),
      },
      Team: {
        name: '',
        role: '',
        isLeader: false,
      },
    },
    WorkSchedule: [
      { day: 'Monday', type: 'On-site' },
      { day: 'Tuesday', type: 'On-site' },
      { day: 'Wednesday', type: 'On-site' },
      { day: 'Thursday', type: 'On-site' },
      { day: 'Friday', type: 'On-site' },
    ]
  }
  const [formData, setFormData] = useState<Employee>(formInitialState);

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      Department: {
        ...prev.Department,
        Role: {
          ...prev.Department.Role,
          [name]: value
        }
      }
    }));
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      Department: {
        ...prev.Department,
        Team: {
          ...prev.Department.Team,
          [name]: name === 'isLeader' ? (e.target as HTMLInputElement).checked : value
        }
      }
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleWorkScheduleChange = (index: number, field: 'day' | 'type', value: string) => {
    setFormData(prev => ({
      ...prev,
      WorkSchedule: prev.WorkSchedule.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    axios.post('http://localhost:3030/api/v1/employees', formData,{
        headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true
      })
      .then(res => {
        console.log(res)
        toast({
          title: "Employee Added",
          description: "The new employee has been successfully added.",
        });
  
        // Reset the form state
        setFormData(formInitialState);
        alert("Employee added successfully")
      })
      .catch((error: AxiosError) => {
        console.error("Error submitting form:", error);
        alert("Failed to add employee, please make sure all fields are filled out correctly.")
        toast({
          title: "Error",
          description: "There was a problem adding the employee.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="p-10 flex justify-center">
      <div className='sm:max-w-[625px] min-w-[550px] bg-white p-10 pt-5 rounded-lg shadow-xl'>
      <h1 className="text-2xl font-semibold mb-5">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea required id="bio" name="bio" value={formData.bio} onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select required name="gender" value={formData.gender} onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } } as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="birthDate">Birth Date</Label>
          <div className="w-full flex border-[1px] border-[rgb(224,226,228)] rounded">
            <input
                type="date"
                required
                max={new Date(new Date().getFullYear() - 15).toDateString()}
                id="birthDate"
                className='outline-none w-full rounded-lg px-[14px] py-[7px] leading-[20px] font-normal text-[14px]'
                onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                setFormData(prev => ({
                    ...prev,
                    birthDate: selectedDate
                }));
              }}
            />
          </div>
        </div>
        <div>
          <Label>Skills</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <Button type="button" onClick={handleAddSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="cursor-default border hover:shadow rounded flex items-center bg-secondary text-secondary-foreground px-3 py-1">
                {skill}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-4 w-4 p-0 hover:bg-white hover:shadow-none"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="position">Department Position</Label>
            <Input required id="position" name="position" value={formData.Department.Role.position} onChange={handleDepartmentChange} />
          </div>
          <div>
            <Label htmlFor="location">Department Location</Label>
            <Input required id="location" name="location" value={formData.Department.Role.location} onChange={handleDepartmentChange} />
          </div>
        </div>
        <div>
            <Label htmlFor="startDate">Start Date</Label>
            <div className="w-full flex border-[1px] border-[rgb(224,226,228)] rounded">
                <input
                    type='date'
                    id="startDate"
                    required
                    className='outline-none w-full rounded-lg px-[14px] py-[7px] leading-[20px] font-normal text-[14px]'
                    onChange={(e) => {
                    const selectedDate = new Date(e.target.value); // Convert string to Date
                    setFormData(prev => ({
                        ...prev,
                        Department: {
                        ...prev.Department,
                        Role: {
                            ...prev.Department.Role,
                            startDate: selectedDate // Assign Date object
                        }
                        }
                    }));
                    }}
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input required id="teamName" name="name" value={formData.Department.Team.name} onChange={handleTeamChange} />
          </div>
          <div>
            <Label htmlFor="teamRole">Team Role</Label>
            <Input required id="teamRole" name="role" value={formData.Department.Team.role} onChange={handleTeamChange} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isLeader"
            name="isLeader"
            checked={formData.Department.Team.isLeader}
            onCheckedChange={(checked: boolean) => handleTeamChange({ target: { name: 'isLeader', checked } } as any)}
          />
          <Label htmlFor="isLeader">Is Team Leader</Label>
        </div>
        <div>
          <Label>Work Schedule</Label>
          {formData.WorkSchedule.map((schedule, index) => (
            <div key={index} className="flex gap-4 mt-2">
              <div className="border w-full border-[#d0d0d0] rounded-md flex items-center px-3 py-2 text-sm h-9">
                {schedule?.day}
              </div>
              <Select
                required
                value={schedule.type}
                onValueChange={(value) => handleWorkScheduleChange(index, 'type', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On-site">On Site</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <footer className="flex w-full justify-between gap-4 mt-5">
          <Button className="w-full" type="button" variant="outline" onClick={() => {scrollTo(0,0);setFormData(formInitialState)}}>
            Cancel
          </Button>
          <Button className="w-full" type="submit">Add Employee</Button>
        </footer>
      </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;

