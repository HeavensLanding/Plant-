import { useEffect, useState } from 'react';
import { getPlants } from '../api/plantActions';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MyPlantCard from '../components/MyPlantCard';
import { deletePlant, markPlantWatered, archivePlant } from '../api/plantActions';
import { Link } from 'react-router-dom';
import PlantStats from '../components/PlantStats';
import SearchBar from '../components/SearchBar';

function MyPlants() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      const allPlants = await getPlants();
      setPlants(allPlants.filter(p => !p.archived)); // only active plants
    };
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
    const success = await deletePlant(id);
    if (success) {
      setPlants(prev => prev.filter(p => p.id !== id));
      toast.success('Plant deleted 🌿');
    }
  };

  const handleWater = async (id) => {
    const plant = plants.find(p => p.id === id);
    if (!plant) return;

    const updated = await markPlantWatered(id, plant.water_history);
    if (updated) {
      setPlants(prev =>
        prev.map(p => (p.id === id ? updated : p))
      );
      toast.success('Plant watered! 💧');
    }
  };

  const handleArchive = async (id) => {
    const archived = await archivePlant(id);
    if (archived) {
      setPlants(prev => prev.filter(p => p.id !== id));
      toast.success('Moved to Greenroom 🌿');
    }
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4">My Plants</h2>
      <PlantStats plants={plants} />
      <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <Row>
        {filteredPlants.map(plant => (
          <Col key={plant.id} md={4}>
            <MyPlantCard
              plant={plant}
              onDelete={handleDelete}
              onWater={handleWater}
              onArchive={handleArchive}
            />
          </Col>
        ))}
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
