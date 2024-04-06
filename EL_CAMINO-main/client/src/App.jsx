import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage"
import { VideoPlayer } from './pages/VideoPlayer/VideoPlayer';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Search } from './pages/SearchPage/Search';
import Upload from './pages/UploadPage/Upload';
import Test2 from './pages/ConnectionTest2/Test2';
import BuyCourse from './pages/BuyCoursePage/BuyCourse';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path = "/video/:id" element = {<VideoPlayer/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>        
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/search/:searchQuery" element = {<Search/>}/>
        <Route path = "/upload" element = {<Upload/>}/>
        <Route path = "/test" element = {<Test2/>}/>
        <Route path = "/unlock/:id" element = {<BuyCourse/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;