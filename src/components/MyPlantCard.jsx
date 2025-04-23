import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NextWaterDate from './NextWaterDate';
import { format, parseISO } from 'date-fns';

function MyPlantCard({ plant, onDelete, onWater, onArchive, onUnarchive }) {
  let formattedLastWatered = 'N/A';

  try {
    if (typeof plant.last_watered === 'string') {
      formattedLastWatered = format(parseISO(plant.last_watered), 'MMMM d, yyyy');
    } else if (typeof plant.last_watered === 'number') {
      formattedLastWatered = format(new Date(plant.last_watered * 1000), 'MMMM d, yyyy');
    }
  } catch (error) {
    console.warn('Invalid last_watered:', plant.last_watered);
  }

  return (
    <Card className="plant-card mb-4">
      <Card.Body className="card-body position-relative">
        <div className="sparkle-overlay" />

        <Card.Title className="text-center fs-4" style={{ color: 'var(--rose-gold)' }}>
          {plant.name}
        </Card.Title>

        <Card.Text className="mt-2">
          <strong>🌿 Type:</strong> {plant.type || 'N/A'} <br />
          <strong>🗓️ Last Watered:</strong> {formattedLastWatered} <br />
          <strong>⏳ Water Schedule (Days):</strong>{' '}
          {typeof plant.water_schedule === 'string'
            ? plant.water_schedule.match(/\d+/)?.[0] || 'N/A'
            : 'N/A'}
        </Card.Text>

        <NextWaterDate lastWatered={plant.last_watered} schedule={plant.water_schedule} />

        {/* View Details Button */}
        <div className="text-center mt-3">
          <Link
            to={`/plant/${plant.id}`}
            className="btn btn-outline-secondary btn-sm fw-semibold"
            style={{ borderRadius: '30px' }}
          >
            🔍 View Details
          </Link>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex flex-column">
            <Button
              variant="info"
              onClick={() => onWater(plant.id)}
              className="fw-bold mb-2"
              style={{ borderRadius: '30px' }}
            >
              💧 Water
            </Button>

            {plant.archived ? (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => onUnarchive(plant.id)}
                className="fw-semibold"
                style={{ borderRadius: '30px' }}
              >
                🌱 Unarchive
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => onArchive(plant.id)}
                className="fw-semibold"
                style={{ borderRadius: '30px' }}
              >
                📦 Archive
              </Button>
            )}
          </div>

          <div className="d-flex flex-column text-end">
            <Link
              to={`/edit/${plant.id}`}
              className="btn btn-warning btn-sm fw-semibold mb-2"
              style={{ borderRadius: '30px' }}
            >
              ✏️ Edit
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(plant.id)}
              className="fw-semibold"
              style={{ borderRadius: '30px' }}
            >
              ❌ Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyPlantCard;
