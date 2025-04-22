import axios, { BASE_URL } from './plantAPI';

// Fetch all plants
export const getPlants = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

// Add a new plant
export const addPlant = async (newPlant) => {
  try {
    const response = await axios.post(BASE_URL, newPlant);
    return response.data;
  } catch (error) {
    console.error('Error adding plant:', error);
    return null;
  }
};

// Update a plant
export const updatePlant = async (id, updatedPlant) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedPlant);
    return response.data;
  } catch (error) {
    console.error('Error updating plant:', error);
    return null;
  }
};

// Delete a plant
export const deletePlant = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting plant:', error);
    return false;
  }
};

// Mark plant as watered
export const markPlantWatered = async (id) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      last_watered: today,
    });
    return response.data;
  } catch (error) {
    console.error('Error marking plant as watered:', error);
    return null;
  }
};
