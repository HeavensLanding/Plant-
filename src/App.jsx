import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPlants from './pages/MyPlants';
import AddEditPlant from './pages/AddEditPlant';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Default toast styles
import PlantDetails from './components/PlantDetails';
import Greenroom from './pages/Greenroom';


function App() {
  return (
    <>
      <AppNavbar />

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-plants" element={<MyPlants />} />
          <Route path="/add" element={<AddEditPlant />} />
          <Route path="/edit/:id" element={<AddEditPlant />} />
          <Route path="/plant/:id" element={<PlantDetails />} />
          <Route path="/greenroom" element={<Greenroom />} />
        </Routes>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        closeOnClick
        theme="colored"
      />
    </>
  );
}

export default App;