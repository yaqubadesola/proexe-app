import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AddNewUser from './pages/AddNewUser';
import EditUser from './pages/EditUser';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/adduser" element={<AddNewUser />} />
        <Route exact path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
