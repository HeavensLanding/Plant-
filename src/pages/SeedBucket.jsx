import React, { useEffect, useState } from 'react';
import { getPlants } from '../api/PlantActions';
import MyPlantCard from '../components/MyPlantCard';
import '../SeedBucket.css';

function SeedBucket() {
  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlants();
      setAllPlants(data);
    };
    fetchData();
  }, []);

  return (
    <div className="seed-bucket-page">
      <div className="text-center mt-5 mb-4">
        <h2 className="seed-bucket-title">The Seed Bucket</h2>
        <p className="seed-bucket-subtitle">A list of all plants, active and archived.</p>
      </div>

      <div className="row justify-content-center">
        {allPlants.length === 0 ? (
          <p className="text-center">No plants found 🌱</p>
        ) : (
          allPlants.map((plant) => (
            <div className="col-md-4 mb-4" key={plant.id}>
              <div className="leaf-card-background">
                <MyPlantCard plant={plant} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SeedBucket;
