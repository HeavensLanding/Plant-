import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import { getPlants } from '../api/PlantActions';
import { format, parseISO } from 'date-fns';

function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const plants = await getPlants();
        const match = plants.find(p => p.id === id);
        setPlant(match || null);
      } catch (error) {
        console.error('Error loading plant:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="warning" />
        <p>Loading plant details...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="text-center mt-5">
        <h2>Plant not found</h2>
        <Link to="/my-plants" className="btn btn-outline-secondary mt-3">
          Back to My Plants
        </Link>
      </div>
    );
  }

  let formattedLastWatered = 'N/A';
  try {
    if (typeof plant.last_watered === 'string') {
      formattedLastWatered = format(parseISO(plant.last_watered), 'MMMM d, yyyy');
    } else if (typeof plant.last_watered === 'number') {
      formattedLastWatered = format(new Date(plant.last_watered * 1000), 'MMMM d, yyyy');
    }
  } catch (error) {
    console.warn('Bad last_watered value:', plant.last_watered);
  }

  return (
    <div className="d-flex justify-content-center">
      <Card className="plant-card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center fs-3" style={{ color: 'var(--rose-gold)' }}>
            {plant.name}
          </Card.Title>
          <Card.Text className="mt-3">
            <strong>🌿 Type:</strong> {plant.type || 'N/A'} <br />
            <strong>🗓️ Last Watered:</strong> {formattedLastWatered} <br />
            <strong>⏳ Water Schedule (Days):</strong>{' '}
            {typeof plant.water_schedule === 'string'
              ? plant.water_schedule.match(/\d+/)?.[0] || 'N/A'
              : 'N/A'}
          </Card.Text>

          {Array.isArray(plant.water_history) && plant.water_history.length > 0 && (
            <div className="mt-3">
              <strong>💧 Water History:</strong>
              <ul className="ps-3">
                {plant.water_history
                  .slice()
                  .reverse()
                  .map((date, index) => {
                    try {
                      const prettyDate =
                        typeof date === 'string'
                          ? format(parseISO(date), 'MMMM d, yyyy')
                          : 'N/A';
                      return <li key={index}>{prettyDate}</li>;
                    } catch (error) {
                      return null;
                    }
                  })}
              </ul>
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/my-plants" className="btn btn-outline-secondary">
              ← Back to My Plants
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PlantDetails;
