import React from 'react'
import './styles.css'
import Pagination from '../../components/Pagination/Pagination'

const Staff: React.FC = () => {
    return (
        <div className='staff'>
            <h1>Staff</h1>
            <div className='sort-list'>
                <div></div>
                <div className='sort-item'>Name</div>
                <div className='sort-item'>Email</div>
                <div className='sort-item'>Role</div>
            </div>
            <div className='staff-list'>
                {
                    Array.from({length: 10}).fill("1").map((_, index) => (
                        <div className='employee-list-item' key={index}>
                            <div className='image-container'>
                                <img
                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAKxABAAIBAwMCBQQDAAAAAAAAAAECAwQRURIhMTJBBSNhkbFicXKBIjRS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrgAAAAAAAAAAAAAAAABMxEbz4GbqtTOWZrXtj45BYza2le2OOuefZUyajLk83nbiOyIMHeq3/U/d6rmyV9OS0f28Bgt4dbaLfO715iF6lotXqrO8csZLpc04cn6Z7SDVCPp4AAAAAAAAAAAHXAEepv0YLW99toZLQ+IT8mkfqZ6wAAAAD2CCjXwW68NLcw9odHO+np9I2TIAAAAAAAAAAAAKvxCN8NZ4sz134heY2x7RtMb7qSwAAAAACjS0P8Ar1/v8rCpoMk2pasxH+PhcQcAAAAAAAAAAJ8ACj8Sj/Kk/SYU2lrMVsmKIpG81tuzZiYmYntPCwAAAAAdrWbTERG8z4KLvw6Pl3nmYXEWlxzjwVraNreZSoAAAAAAAAAAAADK1VOjUXjmd2qra3D14+uPVWPvAM4BQAAWNBWZz9XtWFdp6LH0YYmfNu8lE8eAEAAAAAAAAAAAAB4zz8m/8Z/DuS8Y6Ta3iFDPq7ZYmtYitJ+8gqx4dBQAA9mvgn5NP4x+GQs4NXbFWK2iJrH3go0R5x3jJSLV8S9IAAAAAAAAAhy6nFina1t54jur319p9FNv3kF5Dl1WPH2meqeIZ+TPkyeq87ceEZgnz6m+aJie1eIQAoAAAAAAnwam+GIiO9eJXcWqx5O0T0zxLLEwbQycefJj9N5248rFNfaPXTf9pMF4Q4tTiyztW208T2TAAAK2tyWpjiKzt1eZAGcAQAFAAAAAAAAAAAABo6LJa+OYtO/T4kEFkAH/2Q=="
                                />
                            </div>
                            <h3>John Doe</h3>
                            <a href='mailto:someone@gmail.com' id='email' title='Send a message'>johndoe@gmail.com</a>
                            <h4>Department here</h4>
                            <button>Message</button>
                        </div>
                    ))
                }
            </div>
            <Pagination total={5} currentPage={1}/>
        </div>
    )
}

export default Staff