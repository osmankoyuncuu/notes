import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./component/NewNote";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
