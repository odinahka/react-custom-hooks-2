import React, { useEffect, useState } from 'react';
import {useHttp} from './hooks/use-http'

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);


  const transformTask = taskObj => {
    const loadedTask = [];

    for ( const taskKey in taskObj){
      loadedTask.push({id : taskKey, text : taskObj[taskKey].text})
    }
    setTasks(loadedTask)
  };

  const {isLoading, error, sendRequest : fetchTasks} = useHttp()
  

  useEffect(() => {
    fetchTasks({url: 'https://react-http-post-35139-default-rtdb.firebaseio.com/tasks.json'}, transformTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
