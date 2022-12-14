import { render } from "@testing-library/react";
import { useState } from "react";
import CourseList from "./CourseList"
import Schedule from "./Schedule"
import Modal from "./Modal"
import SignInOut from "./SignIn";

import { useProfile } from "../utilities/profile"


export const terms = {
    Fall : "Fall",
    Winter : "Winter",
    Spring : "Spring",
  
  };

const TermChoice = ({term, selection, setSelection}) => (
    <div>
        <input type = "radio" id={term} className="btn-check" checked={term === selection} autoComplete="off" onChange={() => setSelection(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term} data-cy={term}>{term}</label>
        
    </div>
);


const TermSelector = ({selection, setSelection}) => (
    <div className="btn-group">
        {
            Object.keys(terms).map(term => <TermChoice key={term} term={term} selection={selection} setSelection={setSelection}/>)
        }

    </div>
);

const CurrentTerm = ({selection}) => (
    <h3 align="left" className="card">
    { terms[selection] }
    </h3>
  );



const TermPage = ({courses}) => {
    const [selection, setSelection] = useState(Object.keys(terms)[0]);
    const [openScheduleDialog, setScheduleDialog] = useState(false);
    const [coursesSelected, setCourses] = useState([]);
    const [profile, profileLoading, profileError] = useProfile();

    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>
    if (profileLoading) return <h1>Loading user profile</h1>
    if (!profile) return <h1>No profile data</h1>

    
    

    const openScheduleModal = () => setScheduleDialog(true);
    const closeScheduleModal = () => setScheduleDialog(false);
    
    
        return (
            <div>
                <Modal courses={courses} coursesSelected={coursesSelected} open={openScheduleDialog} close={closeScheduleModal} />
                <div className="d-flex justify-content-between">
                    <TermSelector selection={selection} setSelection={setSelection}/>
                    <div className="d-flex justify-content-between">
                        <Schedule open={openScheduleModal}/>
                        <SignInOut />
                    </div>
                </div>
         
                <CurrentTerm selection={selection}/>
                
                <CourseList courses = {courses} term= {selection} selected={coursesSelected} setSelection={setCourses} admin={profile.isAdmin}/>
                
            </div>
        );
    
    
}

export default TermPage;
