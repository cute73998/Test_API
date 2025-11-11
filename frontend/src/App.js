
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import List from './List';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Edit from './Edit';
import Add from './Add';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<List/>}></Route>
    <Route path='/edit/:id' element={<Edit/>}></Route>
    <Route path='/add' element={<Add/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
