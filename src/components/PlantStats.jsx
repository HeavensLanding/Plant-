import React, { useEffect, useState } from 'react';
import { getPlants } from '../api/PlantActions';
import '../PlantStats.css';

function PlantStats({ showArchived = true }) {
  const [activeCount, setActiveCount] = useState(0);
  const [archivedCount, setArchivedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const allPlants = await getPlants();
      const active = allPlants.filter(p => !p.archived);
      const archived = allPlants.filter(p => p.archived);

      setActiveCount(active.length);
      setArchivedCount(archived.length);
    };

    fetchData();
  }, []);

  return (
    <div className="plant-stats plant-stats-widget mt-4 mb-5 text-center">
      <h2 className="dashboard-heading">🌟 Garden Overview</h2>
      <p className="dashboard-stat">
        🪴 <strong>Active Plants:</strong> {activeCount}
      </p>
      {showArchived && (
        <p className="dashboard-stat">
          📦 <strong>Archived Plants:</strong> {archivedCount}
        </p>
      )}
    </div>
  );
}

export default PlantStats;
