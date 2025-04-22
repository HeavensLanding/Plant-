import { Card } from 'react-bootstrap';

function PlantStats({ plants }) {
  const totalPlants = plants.length;

  const needsWater = plants.filter((plant) => {
    const today = new Date();
    const lastWatered = new Date(plant.last_watered);
    const daysSinceWatered = Math.floor((today - lastWatered) / (1000 * 60 * 60 * 24));

    const match = plant.water_schedule?.match(/\d+/);
    const scheduleDays = match ? parseInt(match[0]) : Infinity;

    return daysSinceWatered >= scheduleDays;
  }).length;

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>🌿 Plant Dashboard</Card.Title>
        <Card.Text>
          <strong>Total Plants:</strong> {totalPlants} <br />
          <strong>Need Water Today:</strong> {needsWater}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PlantStats;
