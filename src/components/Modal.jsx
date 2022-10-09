import './Modal.css'


   
// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const Modal = ({ courses, coursesSelected, open, close }) => {
    //const info = pertinentInfo(courses, coursesSelected);
    
    const scheduleInfo = coursesSelected.length < 1 ? <div>No classes selected.  Please click a class card to select.</div> 
    : coursesSelected.map( x => {
        
        const course = Object.values(courses)[x];

        return (
            <div>Class CS {course.number} {course.title} meets {course.meets}</div>
        )
        }
    )


    
     


    
    return(
    <div
      className={`modal ${open ? 'modal-show' : ''}`}
      tabIndex="-1"
      role="dialog"
      onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" aria-label="Close"
              onClick={close}
            />
          </div>
          <div className="modal-body">{scheduleInfo}</div>
        </div>
      </div>
    </div>
   )
}
  
export default Modal;