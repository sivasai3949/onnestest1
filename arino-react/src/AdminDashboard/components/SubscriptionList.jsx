import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin-subscribe");
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions", err);
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <div className="container">
      <h2 className="text-dark">Subscribed Emails</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={subscription._id}>
              <td>{index + 1}</td>
              <td>{subscription.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionList;
