import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from '../utilities/fetch'
import { useDbData } from '../utilities/firebase';
import { Route, Routes, useParams} from 'react-router-dom'
import Banner from './/Banner'
import TermPage from './TermPage'
import EditCourseForm from './EditCourseForm';

/*
const EditPages = ({courses}) => 
    (courses.map(
        course => <Route path={`/${course}/edit`} element={<EditCourseForm course={course}/>}> </Route>)
    )
*/
const CourseForUrl = ({schedule}) =>  {
    const { match } = useParams();
    return <EditCourseForm course={match} schedule={schedule}/>;
}

const Main = () => {
    //const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php")\
    const [schedule, error] = useDbData("/");
  
    if (error) return <h1>Error loading schedule: {`${error}`}</h1>;
    if (schedule === undefined) return <h1>Loading schedule...</h1>;
    if (!schedule) return <h1>No user data found</h1>;
   
    //const courses = Object.values(schedule.courses).map(course => course.term[0] + course.number)
   
    return (
      <div>
        <h1>
          <Banner title={schedule.title} />
        </h1>
  
        <div>
        <Routes>
                <Route path="/" element={<TermPage courses={schedule.courses}/>}></Route>
                
                <Route path="/:match/edit" element={<CourseForUrl schedule={schedule.courses}/>}></Route>
        </Routes>
          
        </div>
      </div>
    )
  }

const LandingPage = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Main />
      
            </div>
        </QueryClientProvider>
    )
}

export default LandingPage;