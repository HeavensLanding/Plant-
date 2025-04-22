import { useState, useEffect } from 'react';
import { getPlants, deletePlant, addPlant, updatePlant } from '../api/plantActions';
import { Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MyPlantCard from '../components/MyPlantCard';
import SearchBar from '../components/SearchBar';
import PlantStats from '../components/PlantStats';

function MyPlants() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      const plantsData = await getPlants();
      setPlants(plantsData);
    };
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
    const plantToDelete = plants.find((p) => p.id === id);
    const success = await deletePlant(id);
    if (success) {
      setPlants((prev) => prev.filter((plant) => plant.id !== id));

      const undo = () => {
        addPlant(plantToDelete).then((restoredPlant) => {
          setPlants((prev) => [...prev, restoredPlant]);
          toast.success(`🌿 ${restoredPlant.name} restored!`);
        });
      };

      toast(
        ({ closeToast }) => (
          <div>
            🗑️ {plantToDelete.name} deleted!
            <button
              onClick={() => {
                undo();
                closeToast();
              }}
              style={{
                marginLeft: '1rem',
                background: 'transparent',
                border: 'none',
                color: '#ffd700',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Undo
            </button>
          </div>
        ),
        {
          autoClose: 5000,
          pauseOnHover: true,
          closeOnClick: false,
          draggable: true,
          theme: 'colored',
        }
      );
    }
  };

  const handleWater = async (id) => {
    const wateredPlant = plants.find((p) => p.id === id);
    const updatedPlant = {
      ...wateredPlant,
      last_watered: new Date().toISOString().split('T')[0],
    };

    const success = await updatePlant(id, updatedPlant);
    if (success) {
      setPlants((prev) =>
        prev.map((p) => (p.id === id ? success : p))
      );
      toast.success(`💧 ${success.name} was watered!`);
    }
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4">My Plants</h2>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <PlantStats plants={plants} />

      <Row className="mt-4">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <Col key={plant.id} md={4} className="mb-3">
              <MyPlantCard
                plant={plant}
                onDelete={handleDelete}
                onWater={handleWater}
              />
            </Col>
          ))
        ) : (
          <p>No plants found. Try a different name or add a new one!</p>
        )}
      </Row>

      <div className="text-center mt-4">
        <Link to="/add" className="add-btn">
          ➕ Add Plant
        </Link>
      </div>
    </div>
  );
}

export default MyPlants;
