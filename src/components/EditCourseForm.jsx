
import { useFormData } from '../utilities/useFormData';
import {useNavigate} from 'react-router-dom'
import { useDbUpdate } from '../utilities/firebase';



const validateCourseData = (key, val) => {
  console.log(key + val);
  switch (key) {
    case 'Course Title':
      return /(^\w\w)/.test(val) ? '' : 'Course Title needs at least two characters eg. UI';
    case 'Meeting Time':
      return /((M|Tu|W|Th|F)+) ([0-9]{1,2}):([0-9]{2})-([0-9]{1,2}):([0-9]{2})/.test(val) ? '' 
        : 'Must specify weekday and start/end times ex. MTuWThF 0:00-12:59'
    default: return '';
  }
}

/*
const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);
*/
const InputField = ({name, text, id, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={id} name={text} 
      defaultValue={name} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[text]}</div>
  </div>
);


//
const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};
/*
const EditCourseForm = ({user}) => {
  //const [update, result] = useDbUpdate(`/users/${user.id}`);
  const [state, change] = useFormData(validateUserData, user);
  
  //<ButtonBar message={result?.message} />
  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="firstName" text="First Name" state={state} change={change} />
      <InputField name="lastName" text="Last Name" state={state} change={change} />
      <InputField name="email" text="Email" state={state} change={change} />
      <ButtonBar message="Huh?" />
    </form>
  )
};

*/

const EditCourseForm = ({course, schedule}) => {
  const c = schedule[course];
  const [update, result] = useDbUpdate(`/courses/${course}`)
  const[state, change] = useFormData(validateCourseData, c);

  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name={c.title} text="Course Title" id="title" state={state} change={change} />
      <InputField name={c.meets} text="Meeting Time" id="meets" state={state} change={change} />
      <ButtonBar message={result?.message} disabled={state.errors}/>
    </form>
  )
}

export default EditCourseForm;