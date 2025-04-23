import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { addPlant, updatePlant, getPlants } from '../api/PlantActions';
import { toast } from 'react-toastify';

function AddEditPlant() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [water_schedule, setWaterSchedule] = useState('');
  const [last_watered, setLastWatered] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const plants = await getPlants();
        const existing = plants.find(p => p.id === id);
        if (existing) {
          setName(existing.name);
          setType(existing.type);
          setWaterSchedule(existing.water_schedule);
          setLastWatered(existing.last_watered || '');
          setNotes(existing.notes || '');
        }
      } catch (error) {
        console.error('Error fetching plant:', error);
      }
    };

    if (id) {
      fetchPlant();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plantData = {
      name,
      type,
      water_schedule,
      last_watered,
      notes,
      water_history: last_watered ? [last_watered] : []
    };

    try {
      if (id) {
        await updatePlant(id, plantData);
        toast.success('Plant updated!');
      } else {
        await addPlant(plantData);
        toast.success('New plant added!');
      }
      navigate('/my-plants');
    } catch (error) {
      console.error('Error saving plant:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ maxWidth: '600px', width: '100%' }} className="p-4 shadow">
        <h2 className="text-center mb-4">{id ? 'Edit Plant' : 'Add New Plant'}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Plant Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plant Type</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Water Schedule (e.g. every 7 days)</Form.Label>
            <Form.Control
              type="text"
              value={water_schedule}
              onChange={(e) => setWaterSchedule(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Watered Date</Form.Label>
            <Form.Control
              type="date"
              value={last_watered}
              onChange={(e) => setLastWatered(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter notes about this plant..."
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit">
              {id ? 'Update Plant' : 'Save Plant'}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default AddEditPlant;
