import { BrowserRouter, Routes, Route, Link } from "react-router";
import Auth from './pages/Auth'
import Image from "./components/Image";

const App = () => {
  return (
    <div className='container mx-auto px-4 md:px-16 bg-gray-100 shadow-md h-screen'>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/image" element={<Image />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App