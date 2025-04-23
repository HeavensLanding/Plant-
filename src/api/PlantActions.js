import { axios, BASE_URL } from './plantAPI';


// ✅ Get all plants
export const getPlants = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

// ✅ Add a new plant
export const addPlant = async (newPlant) => {
  try {
    const response = await axios.post(BASE_URL, newPlant);
    return response.data;
  } catch (error) {
    console.error('Error adding plant:', error);
    return null;
  }
};

// ✅ Update an existing plant
export const updatePlant = async (id, updatedPlant) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedPlant);
    return response.data;
  } catch (error) {
    console.error('Error updating plant:', error);
    return null;
  }
};

// ✅ Delete a plant
export const deletePlant = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting plant:', error);
    return false;
  }
};

// ✅ Mark a plant as watered and add to water history
export const markPlantWatered = async (id, currentHistory = []) => {
  const today = new Date().toISOString().split('T')[0];
  const newHistory = [...(currentHistory || []), today];

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      last_watered: today,
      water_history: newHistory
    });
    return response.data;
  } catch (error) {
    console.error('Error marking plant as watered:', error);
    return null;
  }
};
// ✅ Archive a plant
export const archivePlant = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { archived: true });
    return response.data;
  } catch (error) {
    console.error('Error archiving plant:', error);
    return null;
  }
};

export const getArchivedPlants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?archived=true`);
    return response.data;
  } catch (error) {
    console.error('Error fetching archived plants:', error);
    return [];
  }
};
