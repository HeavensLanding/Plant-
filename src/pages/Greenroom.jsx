import { useEffect, useState } from 'react';
import { getPlants, deletePlant, updatePlant } from '../api/PlantActions';
import MyPlantCard from '../components/MyPlantCard';
import '../Greenroom.css';

function Greenroom() {
  const [archivedPlants, setArchivedPlants] = useState([]);

  useEffect(() => {
    const fetchArchived = async () => {
      const allPlants = await getPlants();
      const archived = allPlants.filter(p => p.archived === true);
      setArchivedPlants(archived);
    };

    fetchArchived();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this plant permanently?');
    if (!confirm) return;

    const success = await deletePlant(id);
    if (success) {
      setArchivedPlants(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUnarchive = async (id) => {
    const updated = await updatePlant(id, { archived: false });
    if (updated) {
      setArchivedPlants(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="text-center mt-5 container">
      <h2 className="greenroom-title">Greenroom</h2>
      <p className="greenroom-subtitle">Your peaceful archive of past plants</p>

      <div className="row justify-content-center mt-4">
        {archivedPlants.length === 0 ? (
          <p>No archived plants just yet 🌱</p>
        ) : (
          archivedPlants.map((plant) => (
            <div className="col-md-4 mb-4" key={plant.id}>
              <MyPlantCard
                plant={plant}
                onDelete={handleDelete}
                onUnarchive={handleUnarchive}
                isArchived={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Greenroom;
