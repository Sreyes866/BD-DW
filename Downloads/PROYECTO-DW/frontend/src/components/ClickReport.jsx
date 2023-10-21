import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClickReport = () => {
  const [clickData, setClickData] = useState([]);

  const fetchClickData = async () => {
    try {
      const response = await axios.get('http://localhost/GetClickReport.php');
      setClickData(response.data);
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
  };

  useEffect(() => {
    fetchClickData();
  }, []);

  return (
    <div>
      <h3>Reporte de Clicks</h3>
      <ul>
        {clickData.map((data, index) => (
          <li key={index}>
            {data.page_name}: {data.click_count} clicks
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClickReport;