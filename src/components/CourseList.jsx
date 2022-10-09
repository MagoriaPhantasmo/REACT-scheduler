import './CourseList.css'
import Course from './Course'
import { useState } from 'react'

const CourseList = ({courses, term, selected, setSelection}) => {
    


    const toggleSelected = (item) => setSelection(
        selected.includes(item) ? selected.filter(x => x !== item) : [...selected, item]
    );

    const temp = Object.values(courses).map((value, index) => {
        if (value.term === term){
        return (
            <Course index={index} info={value} selected={selected} toggleSelected={toggleSelected} all={courses}/>
            )
        }
    }
) 
    return (<div className='course-list'>{temp}</div>);


    
}

export default CourseList;