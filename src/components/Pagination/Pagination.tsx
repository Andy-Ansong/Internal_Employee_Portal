import React from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'

interface Props{
    total: number,
    currentPage: number,
    changePage: (page:number) => void,
    nextPage: () => void,
    prevPage: () => void,
    limit: number
}

const Pagination: React.FC<Props> = (props) => {
    return (
        <nav className='pagination-nav' aria-label="Page navigation">
            <ul className="pagination">
                <button onClick={props.prevPage} className={`page-icon ${props.currentPage <= 1 && "disabled"}`}>
                    <IoIosArrowDropleftCircle size={30}/>
                </button>
                {
                    Array.from({length: Math.ceil(props.total/props.limit)}).fill("1").map((_, index) => (
                        <button key={index}
                        className={`page-link ${props.currentPage == index+1 ? 'current-page' : ''}`}
                        onClick={() => {props.changePage(index+1)}}>
                            {index+1}
                        </button>
                    ))
                }
                <button onClick={props.nextPage} className={`page-icon ${props.currentPage >= props.total / props.limit && "disabled"}`}>
                    <IoIosArrowDroprightCircle size={30}/>
                </button>
            </ul>
        </nav>
    )
}

export default Pagination