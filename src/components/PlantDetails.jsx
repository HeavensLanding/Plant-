import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlants, updatePlant } from '../api/PlantActions';
import { Card, Form, Button } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import '../PlantDetails.css';

function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPlant = async () => {
      const allPlants = await getPlants();
      const found = allPlants.find((p) => p.id === id);
      if (found) {
        setPlant(found);
        setNotes(found.notes || '');
      }
    };
    fetchPlant();
  }, [id]);

  const handleSaveNotes = async () => {
    if (!plant) return;
    setSaving(true);
    const updated = await updatePlant(plant.id, { ...plant, notes });
    setPlant(updated);
    setSaving(false);
  };

  if (!plant) return <p className="text-center mt-5">Loading plant details...</p>;

  return (
    <Card className="leafy-card shadow-lg mx-auto p-4 mt-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-3" style={{ color: 'var(--rose-gold)' }}>
        {plant.name}
      </h2>

      <p><strong>🌿 Type:</strong> {plant.type}</p>
      <p><strong>🗓️ Last Watered:</strong> {plant.last_watered ? format(parseISO(plant.last_watered), 'MMMM d, yyyy') : 'N/A'}</p>
      <p><strong>⏳ Water Schedule:</strong> {plant.water_schedule}</p>

      {Array.isArray(plant.water_history) && plant.water_history.length > 0 && (
        <div className="mt-3">
          <strong>💧 Full Water History:</strong>
          <ul>
            {plant.water_history.slice().reverse().map((date, idx) => (
              <li key={idx}>
                {typeof date === 'string' ? format(parseISO(date), 'MMMM d, yyyy') : 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Form className="mt-4">
        <Form.Group controlId="plantNotes">
          <Form.Label><strong>📝 Notes</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes about this plant..."
          />
        </Form.Group>
        <Button
          variant="success"
          className="mt-3"
          onClick={handleSaveNotes}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Notes'}
        </Button>
      </Form>
    </Card>
  );
}

export default PlantDetails;
