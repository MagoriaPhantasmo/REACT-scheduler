import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.svg';
import Banner from './components/Banner'
import CourseList from './components/CourseList'
import './App.css';

const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php")

  if (error) return <h1>Error loading schedule: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule...</h1>;
  if (!schedule) return <h1>No user data found</h1>;
 
  return (
    <div>
      <h1>
        <Banner title={schedule.title} />
      </h1>

      <div>
        <CourseList courses={schedule.courses} />
      </div>
    </div>
  )
}

const queryClient = new QueryClient();

const App = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Main />
      
    </div>
    </QueryClientProvider>
  );
};

export default App;
