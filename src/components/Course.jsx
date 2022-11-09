import "./Course.css"
import { conflictcheck } from "../utilities/supplementary"
import {Link, Route, Routes} from 'react-router-dom'

import EditCourseForm  from './EditCourseForm'

const CourseEdit = ({course, admin}) => {
    const page = course.term[0] + course.number;
    //const result = useProfile();
    //console.log(result);
    //console.log(useAuthState());
    return (
        !admin ? null : 
    <Link to={`${page}/edit`} >
        <button className="btn" id="within" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
            </svg>
        </button>
    </Link>

    )

}



const Course = ({index, info, selected, toggleSelected, all, admin}) => {
    const selectedWO = selected.filter(s => s !== index);
    const selectedInfo = selectedWO.map(x => Object.values(all)[x]);
    const disabled = conflictcheck(info, selectedInfo)

    const page = info.term[0] + info.number
    
    //dropped this chief key = {index}
    return (
    
        
    <div className='card' >
        
            
            
            
            <CourseEdit course={info} admin={admin}/>    
            <div className= {`card-body ${selected.includes(index) ? 'selected' : ''} ${disabled && !selected.includes(index) ? 'disabled' : ''}`}
                    onClick={ disabled ? null : () => toggleSelected(index)}>
                
                    <h5 className='card-title' data-cy="course">{info.term} CS {info.number}</h5>
                        
                    
                    <p className='card-text'>{info.title}</p>
                    
                    <p className='card-text'><hr/>{info.meets}</p>

                    
                                       
                 
                
            </div>
    </div>
    )
}

export default Course;