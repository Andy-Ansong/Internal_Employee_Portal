import React from 'react'

const Profile: React.FC = () => {
    return (
        <div className='profile'>
            <div className='profile-card'>
                <h1>Personal file</h1>
                <div className='personal'>
                    <div className='image-button'>
                        <div>
                            <div>
                            <img
                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAKxABAAIBAwMCBQQDAAAAAAAAAAECAwQRURIhMTJBBSNhkbFicXKBIjRS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrgAAAAAAAAAAAAAAAABMxEbz4GbqtTOWZrXtj45BYza2le2OOuefZUyajLk83nbiOyIMHeq3/U/d6rmyV9OS0f28Bgt4dbaLfO715iF6lotXqrO8csZLpc04cn6Z7SDVCPp4AAAAAAAAAAAHXAEepv0YLW99toZLQ+IT8mkfqZ6wAAAAD2CCjXwW68NLcw9odHO+np9I2TIAAAAAAAAAAAAKvxCN8NZ4sz134heY2x7RtMb7qSwAAAAACjS0P8Ar1/v8rCpoMk2pasxH+PhcQcAAAAAAAAAAJ8ACj8Sj/Kk/SYU2lrMVsmKIpG81tuzZiYmYntPCwAAAAAdrWbTERG8z4KLvw6Pl3nmYXEWlxzjwVraNreZSoAAAAAAAAAAAADK1VOjUXjmd2qra3D14+uPVWPvAM4BQAAWNBWZz9XtWFdp6LH0YYmfNu8lE8eAEAAAAAAAAAAAAB4zz8m/8Z/DuS8Y6Ta3iFDPq7ZYmtYitJ+8gqx4dBQAA9mvgn5NP4x+GQs4NXbFWK2iJrH3go0R5x3jJSLV8S9IAAAAAAAAAhy6nFina1t54jur319p9FNv3kF5Dl1WPH2meqeIZ+TPkyeq87ceEZgnz6m+aJie1eIQAoAAAAAAnwam+GIiO9eJXcWqx5O0T0zxLLEwbQycefJj9N5248rFNfaPXTf9pMF4Q4tTiyztW208T2TAAAK2tyWpjiKzt1eZAGcAQAFAAAAAAAAAAAABo6LJa+OYtO/T4kEFkAH/2Q=="
                            />
                            </div>
                        </div>
                        <div>
                            <h1>John Doe</h1>
                            <p>Male</p>
                        </div>
                        <button>Update</button>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, rem.
                    </p>
                    <div className='personal-details'>
                        <div>
                            <h3>Phone number</h3>
                            <h3>+233123456789</h3>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <h3>johndoe@amalitechservices.org</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-card'>
                <h1>Team info</h1>
                <div className='team'>

                </div>
            </div>
        </div>
    )
}

export default Profile