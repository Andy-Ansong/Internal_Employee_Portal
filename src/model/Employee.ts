export interface Employee{
    name: string,
    bio: string,
    email: string,
    _id: string,
    image: string,
    birthDate: Date,
    phoneNumber: string,
    gender: string,
    userId: string,
    skills: Array<string>,
    Department: {
        Role: {
            position: string,
            location: string,
            startDate: Date
        },
        Team: {
            name: string,
            role: string,
            isLeader: boolean
        }
    },
    WorkSchedule: Array<{
        day: string,
        type: string
    }>
}