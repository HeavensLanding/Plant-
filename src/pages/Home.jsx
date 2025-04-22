import { useEffect, useState } from 'react';
import { getPlants } from '../api/plantActions';

import PlantStats from '../components/PlantStats';
import { Container } from 'react-bootstrap';

function Home() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlants();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="mb-4 text-center">🌿 Welcome to Your Plant Tracker</h1>

      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <PlantStats plants={plants} />
        </div>
      </div>

      <p className="text-center mt-4">
        Track your plants, monitor their watering schedule, and give them the care they deserve ✨
      </p>
    </Container>
  );
}

export default Home;
