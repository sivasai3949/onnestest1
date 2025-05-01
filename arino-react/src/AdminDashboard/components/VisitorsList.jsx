import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin-visitors');
        setVisitors(res.data);
      } catch (err) {
        console.error("Error fetching visitors", err);
      }
    };
    fetchVisitors();
  }, []);

  return (
    <div>
      <h2 className="text-dark">Visitors List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>IP</th>
            <th>City</th>
            <th>Region</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={visitor._id}>
              <td>{index + 1}</td>
              <td>{visitor.ip}</td>
              <td>{visitor.city}</td>
              <td>{visitor.region}</td>
              <td>{visitor.postalCode}</td>
              <td>{visitor.country}</td>
              <td>{new Date(visitor.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorsList;
