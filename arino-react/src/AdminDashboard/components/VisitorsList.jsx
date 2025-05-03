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

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const visitorsPerPage = 5;

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await axios.get('/api/admin-visitors');
        setVisitors(res.data);
        setFilteredVisitors(res.data);
      } catch (err) {
        console.error("Error fetching visitors", err);
      }
    };
    fetchVisitors();
  }, []);

  // Date filtering
  useEffect(() => {
    let filtered = [...visitors];

    if (startDate && endDate) {
      filtered = filtered.filter(visitor => {
        const created = dayjs(visitor.createdAt);
        return created.isSameOrAfter(dayjs(startDate), 'day') &&
               created.isSameOrBefore(dayjs(endDate), 'day');
      });
    }

    setFilteredVisitors(filtered);
    setCurrentPage(1);
  }, [startDate, endDate, visitors]);

  const indexOfLast = currentPage * visitorsPerPage;
  const indexOfFirst = indexOfLast - visitorsPerPage;
  const currentVisitors = filteredVisitors.slice(indexOfFirst, indexOfLast);

  const exportData = () => {
    const exportData = filteredVisitors.map((visitor, i) => ({
      SNo: i + 1,
      IP: visitor.ip,
      City: visitor.city,
      Region: visitor.region,
      PostalCode: visitor.postalCode,
      Country: visitor.country,
      CreatedOn: new Date(visitor.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, `Visitors_List_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="container" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', paddingTop: '30px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h1 style={{ color: '#00B5F9', fontWeight: 'bold', fontSize: '36px' }}>Visitors List</h1>
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
              <th>IP</th>
              <th>City</th>
              <th>Region</th>
              <th>Postal Code</th>
              <th>Country</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {currentVisitors.map((visitor, index) => (
              <tr key={visitor._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td>{indexOfFirst + index + 1}</td>
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

      {/* Pagination */}
      <div className="d-flex justify-content-center my-5">
        <Pagination
          current={currentPage}
          total={filteredVisitors.length}
          pageSize={visitorsPerPage}
          onChange={page => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default VisitorsList;
