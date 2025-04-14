import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Exercise } from "./pages/Exercise";
import { CreateExercise } from "./pages/CreateExercise";
import { EditExercise } from "./pages/EditExercise";
import { Trainings } from "./pages/Trainings";
import { CreateTraining } from "./pages/CreateTraining";
import { Runner } from "./pages/Runner";
import { NotFound } from "./pages/NotFound";
import { Character } from './pages/Character';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/exercise/:id",
    element: <Exercise />,
  },
  {
    path: "/create_exercise",
    element: <CreateExercise />,
  },
  {
    path: "/edit_exercise/:id",
    element: <EditExercise />,
  },
  {
    path: "/trainings",
    element: <Trainings />,
  },
  {
    path: "/create_training",
    element: <CreateTraining />,
  },
  {
    path: "/runner",
    element: <Runner />,
  },
  {
    path: "/character",
    element: <Character />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
