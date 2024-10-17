import React from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'

interface Props{
    total: number,
    currentPage: number
}

const Pagination: React.FC<Props> = (props) => {
    return (
        <nav className='pagination-nav' aria-label="Page navigation">
            <ul className="pagination">
                <a className="page-icon disabled">
                    <IoIosArrowDropleftCircle size={30}/>
                </a>
                {
                    Array.from({length: props.total}).fill("1").map((_, index) => (
                        <a className={`page-link ${props.currentPage == index+1 ? 'current-page' : ''}`} href="#">{index+1}</a>
                    ))
                }
                <a className="page-icon" href="#">
                    <IoIosArrowDroprightCircle size={30}/>
                </a>
            </ul>
        </nav>
    )
}

export default Pagination