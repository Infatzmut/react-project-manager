import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from './components/SelectedProject'
import { useState } from 'react';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })


  function handleAddTasks(text){
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }
      return {
        ...prevState,
        tasks: [newTask,...prevState.tasks] 
      }
    })
  }

  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState, 
        tasks: prevState.tasks.filter(task => task.id !== id )
      }
    })
  }


  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null, 
      }
    })
  }

  const handleCancelAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined, 
      }
    })
  }

  const handleAddProject= (projectData) => {
    const projectID = Math.random();
    const newProject = {
        ...projectData, 
        id: projectID
    }
    setProjectsState(prevState => {
        return {
            ...prevState,
            projects: [...prevState.projects, newProject],
            selectedProjectId: undefined
        }
    })
  } 
  
  const handleSelectedProject = (id) => {
    setProjectsState(prevState => {
      return {
        ...prevState, 
        selectedProjectId: id
      }
    })
  }

  const handleDeleteProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState, 
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId  )
      }
    })
  }
  

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = <SelectedProject  project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTasks} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}/>;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects}
        onSelectProject={handleSelectedProject}
        selectedProjectId={projectsState.selectedProjectId}
        />
      {content}
    </main>
  );
}

export default App;
