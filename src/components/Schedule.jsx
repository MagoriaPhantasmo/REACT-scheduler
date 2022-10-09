
const ScheduleButton = ({open}) => (
    <button className='ms-auto btn btn-dark' onClick={open} >Schedule</button>
)

const Schedule = ({open}) => {
    return (
        <nav className='d-flex'>

            <ScheduleButton open={open}/>
        </nav>
    )
}

export default Schedule;