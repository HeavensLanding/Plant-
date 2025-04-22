import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NextWaterDate from './NextWaterDate';
import { format, parseISO } from 'date-fns';


function MyPlantCard({ plant, onDelete, onWater }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className={hovered ? 'sparkle-hover' : ''}>
        <Card.Body>
          <Card.Title>{plant.name}</Card.Title>

          <Card.Text>
            <strong>Type:</strong> {plant.type} <br />
            <strong>Last Watered:</strong>{' '}
                {plant.last_watered ? format(parseISO(plant.last_watered), 'MMMM d, yyyy') : 'N/A'} <br />
            <strong>Water Schedule (in days):</strong> {plant.water_schedule}
          </Card.Text>

          {/* 🌿 Custom component for next water date */}
          <NextWaterDate
            lastWatered={plant.last_watered}
            schedule={plant.water_schedule}
          />

          <div className="d-flex justify-content-between flex-wrap gap-2 mt-3">
            <Button variant="info" onClick={() => onWater(plant.id)}>
              💧 Mark as Watered
            </Button>

            <Link to={`/edit/${plant.id}`} className="btn btn-warning">
              ✏️ Edit
            </Link>

            <Button variant="danger" onClick={() => onDelete(plant.id)}>
              🗑️ Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyPlantCard;
