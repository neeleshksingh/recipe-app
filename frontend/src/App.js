import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/landing";
import Login from "./components/login";
import Nav from "./components/nav";
import New from "./components/new";
import Recipe from "./components/recipe";
import Register from "./components/register";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/landing" element={<><Nav/><Landing/></>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/recipe" element={<Recipe/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
