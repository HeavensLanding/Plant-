import { useState, useEffect } from 'react';
import { getPlants, deletePlant, addPlant, archivePlant, markPlantWatered } from '../api/PlantActions';
import MyPlantCard from '../components/MyPlantCard';
import PlantStats from '../components/PlantStats';
import { toast } from 'react-toastify';

function MyPlants() {
  const [plants, setPlants] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    const data = await getPlants();
    setPlants(data.filter((plant) => !plant.archived));
  };

  const handleDelete = async (id) => {
    const plantToDelete = plants.find((p) => p.id === id);
    const success = await deletePlant(id);
    if (success) {
      setLastDeleted(plantToDelete);
      setPlants((prev) => prev.filter((p) => p.id !== id));
      toast.info('Plant deleted. Click undo to restore.', { autoClose: 5000 });
    }
  };

  const handleUndo = async () => {
    if (!lastDeleted) return;
    const restored = await addPlant({ ...lastDeleted, id: undefined });
    if (restored) {
      setPlants((prev) => [restored, ...prev]);
      setLastDeleted(null);
      toast.success('Plant restored!');
    }
  };

  const handleWater = async (id) => {
    const updated = await markPlantWatered(id);
    if (updated) {
      setPlants((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  };

  const handleArchive = async (id) => {
    const updated = await archivePlant(id);
    if (updated) {
      setPlants((prev) => prev.filter((p) => p.id !== id));
      toast.success('Plant archived!');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Plants</h2>
      <PlantStats plants={plants} />

      <div className="row mt-4">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.id} className="col-md-4 mb-4">
              <MyPlantCard
                plant={plant}
                onDelete={handleDelete}
                onWater={handleWater}
                onArchive={handleArchive}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No plants found. Add one to get started! 🌱</p>
        )}
      </div>

      {lastDeleted && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-secondary" onClick={handleUndo}>
            Undo Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MyPlants;
