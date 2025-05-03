import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePicker, Button, Pagination } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const subscriptionsPerPage = 5;

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get("/api/admin-subscribe");
        setSubscriptions(res.data);
        setFilteredSubscriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions", err);
      }
    };
    fetchSubscriptions();
  }, []);

  // Updated date filter logic to include same day
  useEffect(() => {
    let filtered = [...subscriptions];

    if (startDate && endDate) {
      filtered = filtered.filter(subscription => {
        const created = dayjs(subscription.createdAt);
        return created.isSameOrAfter(dayjs(startDate), 'day') &&
               created.isSameOrBefore(dayjs(endDate), 'day');
      });
    }

    setFilteredSubscriptions(filtered);
    setCurrentPage(1);
  }, [startDate, endDate, subscriptions]);

  const indexOfLast = currentPage * subscriptionsPerPage;
  const indexOfFirst = indexOfLast - subscriptionsPerPage;
  const currentSubscriptions = filteredSubscriptions.slice(indexOfFirst, indexOfLast);

  const exportData = () => {
    const exportData = filteredSubscriptions.map((sub, i) => ({
      SNo: i + 1,
      Email: sub.email,
      SubscribedOn: new Date(sub.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscriptions");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, `Subscription_List_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="container" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', paddingTop: '30px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h1 style={{ color: '#00B5F9', fontWeight: 'bold', fontSize: '36px' }}>Subscribed Emails</h1>
        <Button
          type="primary"
          onClick={exportData}
          style={{ backgroundColor: '#00B5F9', borderColor: '#00B5F9', borderRadius: '20px', padding: '8px 24px' }}
        >
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <label htmlFor="startDate" style={{ color: '#00B5F9', fontWeight: 600 }}>Start Date</label>
          <DatePicker
            id="startDate"
            style={{ width: '100%', borderRadius: '8px' }}
            value={startDate}
            onChange={setStartDate}
            format="YYYY-MM-DD"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="endDate" style={{ color: '#00B5F9', fontWeight: 600 }}>End Date</label>
          <DatePicker
            id="endDate"
            style={{ width: '100%', borderRadius: '8px' }}
            value={endDate}
            onChange={setEndDate}
            format="YYYY-MM-DD"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card p-4 shadow-sm" style={{ borderRadius: '10px' }}>
        <table className="table table-bordered">
          <thead style={{ backgroundColor: '#00B5F9', color: '#fff' }}>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Subscribed On</th>
            </tr>
          </thead>
          <tbody>
            {currentSubscriptions.map((sub, index) => (
              <tr key={sub._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{sub.email}</td>
                <td>{new Date(sub.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center my-5">
        <Pagination
          current={currentPage}
          total={filteredSubscriptions.length}
          pageSize={subscriptionsPerPage}
          onChange={page => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SubscriptionList;
