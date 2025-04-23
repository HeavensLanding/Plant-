import { useEffect, useState } from 'react';
import { getArchivedPlants, unarchivePlant } from '../api/PlantActions';
import MyPlantCard from '../components/MyPlantCard';
import '../Greenroom.css';

function Greenroom() {
  const [archivedPlants, setArchivedPlants] = useState([]);

  useEffect(() => {
    const fetchArchived = async () => {
      const data = await getArchivedPlants();
      setArchivedPlants(data);
    };
    fetchArchived();
  }, []);

  const handleUnarchive = async (id) => {
    await unarchivePlant(id);
    setArchivedPlants((prev) => prev.filter((plant) => plant.id !== id));
  };

  return (
    <div className="greenroom-wrapper">
      <h2 className="greenroom-title">Greenroom</h2>
      <p className="greenroom-subtitle">Your peaceful archive of past plants</p>

      <div className="row justify-content-center mt-4">
        {archivedPlants.length === 0 ? (
          <p>No archived plants just yet 🌱</p>
        ) : (
          archivedPlants.map((plant) => (
            <div className="col-md-4 mb-4" key={plant.id}>
              <MyPlantCard plant={plant} onUnarchive={handleUnarchive} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Greenroom;
