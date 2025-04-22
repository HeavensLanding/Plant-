import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addPlant, updatePlant } from '../api/plantActions';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddEditPlant() {
  const [plant, setPlant] = useState({
    name: '',
    type: '',
    water_schedule: '',
    last_watered: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      if (id) {
        try {
          const response = await fetch(`https://6807e94a942707d722dcccb2.mockapi.io/plants/${id}`);
          if (!response.ok) throw new Error('Plant not found');
          const data = await response.json();
          setPlant(data);
        } catch (error) {
          console.error('Error fetching plant:', error);
          toast.error('⚠️ Failed to load plant!');
        }
      }
    };

    fetchPlant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePlant(id, plant);
        toast.success('🌟 Plant updated!');
      } else {
        await addPlant(plant);
        toast.success('🌱 New plant added!');
      }
      navigate('/my-plants');
    } catch (error) {
      console.error('Error saving plant:', error);
      toast.error('❌ Something went wrong.');
    }
  };

  return (
    <Card className="p-4 shadow-lg border-0">
      <h2 className="mb-4 text-center">{id ? 'Edit Plant' : 'Add New Plant'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Plant Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Aloe Vera"
            name="name"
            value={plant.name || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Succulent"
            name="type"
            value={plant.type || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWaterSchedule">
          <Form.Label>Water Schedule (in days)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., 14"
            name="water_schedule"
            value={plant.water_schedule || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formLastWatered">
          <Form.Label>Last Watered</Form.Label>
          <Form.Control
            type="date"
            name="last_watered"
            value={plant.last_watered || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="success" type="submit">
            {id ? 'Update Plant' : 'Add Plant'}
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default AddEditPlant;
