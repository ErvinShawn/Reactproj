import Home from "./home";
import { Routes,Route } from "react-router-dom";
import Fav from "./fav";
import NavBar from "./NavBar";

function App() {
  return(
    <>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/fav" element={<Fav/>}/>
        </Routes>
      </main>
    </>
  )
}


export default App;
