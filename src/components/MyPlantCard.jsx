import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NextWaterDate from './NextWaterDate';
import { format, parseISO } from 'date-fns';

function MyPlantCard({ plant, onDelete, onWater }) {
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
        {/* ✨ Sparkle shimmer layer */}
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

        <NextWaterDate
          lastWatered={plant.last_watered}
          schedule={plant.water_schedule}
        />

        {/* 💧 Water History */}
        {Array.isArray(plant.water_history) && plant.water_history.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <strong>💧 Watered On:</strong>
            <ul className="ps-3 mb-2">
              {plant.water_history
                .slice()
                .reverse()
                .map((date, idx) => {
                  try {
                    const prettyDate =
                      typeof date === 'string'
                        ? format(parseISO(date), 'MMMM d, yyyy')
                        : 'N/A';
                    return <li key={idx}>{prettyDate}</li>;
                  } catch (e) {
                    console.warn(`❌ Bad date format at index ${idx}`, date);
                    return null;
                  }
                })}
            </ul>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <Button
            variant="info"
            onClick={() => onWater(plant.id)}
            className="fw-bold"
            style={{ borderRadius: '30px' }}
          >
            💧 Water
          </Button>

          <div className="d-flex flex-column align-items-end">
            <div className="d-flex gap-2 mb-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(plant.id)}
                className="fw-semibold"
                style={{ borderRadius: '30px' }}
              >
                Delete
              </Button>
              <Link
                to={`/edit/${plant.id}`}
                className="btn btn-warning btn-sm fw-semibold"
                style={{ borderRadius: '30px' }}
              >
                Edit
              </Link>
            </div>

            <Link
              to={`/plant/${plant.id}`}
              className="btn btn-outline-secondary btn-sm fw-semibold"
              style={{ borderRadius: '30px' }}
            >
              View Details
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyPlantCard;
