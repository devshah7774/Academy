import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Appbar from "./components/Appbar"
import InitUser from "./components/InitUser";
// import AddCourse from './components/AddCourse';
import Landing from './components/Landing';
// import Courses from './components/Course';
// import CrsId from './components/CrsId';

function App() {

  return (
    <RecoilRoot>
      <Router>
        <Appbar/>
        <InitUser/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        {/* <Route path={"/admin/addcourse"} element={<AddCourse />} />
        <Route path={"/admin/courses"} element={<Courses />} />
        <Route path={"/user/courses"} element={<Courses />} />
        <Route path={"/admin/courses/:courseId"} element={<CrsId />} /> */}
      </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;