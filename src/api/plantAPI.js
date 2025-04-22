import axios from 'axios';

// My MockAPI base URL
const BASE_URL = 'https://6807e94a942707d722dcccb2.mockapi.io/plants';

// Fetch all plants
export const getPlants = async () => {
  try {
    const response = await axios.get(BASE_URL);  // Make GET request to the correct URL
    return response.data;  // This returns the array of plants
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];  // Return an empty array in case of error
  }
};

// Add a new plant
export const addPlant = async (newPlant) => {
  try {
    const response = await axios.post(BASE_URL, newPlant);
    return response.data; // The newly added plant data
  } catch (error) {
    console.error('Error adding plant:', error);
    return null;
  }
};

// Update a plant
export const updatePlant = async (id, updatedPlant) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedPlant);
    return response.data; // The updated plant data
  } catch (error) {
    console.error('Error updating plant:', error);
    return null;
  }
};

// Delete a plant
export const deletePlant = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true; // Indicates successful deletion
  } catch (error) {
    console.error('Error deleting plant:', error);
    return false;
  }
};

// Mark a plant as watered (updates last_watered to today)
export const markPlantWatered = async (id) => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
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
  