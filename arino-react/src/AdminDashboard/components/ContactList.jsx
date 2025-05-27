// src/components/ContactList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePicker, Select, Button } from 'antd';
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;
const { Option } = Select;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [productFilter, setProductFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const productOptions = ["All", "Defence", "Ground", "Space", "Others"];

  // fetch contacts once
  useEffect(() => {
    axios.get('/api/admin-contact')
      .then(res => {
        setContacts(res.data);
        setFiltered(res.data);
      })
      .catch(console.error);
  }, []);

  // export to Excel
  const exportData = () => {
    const rows = filtered.map((c, i) => ({
      SNo: i + 1,
      Name: c.fullName,
      Email: c.email,
      Product: c.product,
      Mobile: c.mobile,
      Message: c.message,
      CreatedOn: new Date(c.createdAt).toLocaleString(),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf]), `Contact_List_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // apply filters on click
  const handleFilter = () => {
    const [start, end] = dateRange;
    let tmp = [...contacts];

    // date filter
    if (start && end) {
      tmp = tmp.filter(c => {
        const d = dayjs(c.createdAt);
        return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(end, 'day');
      });
    }

    // product filter
    if (productFilter && productFilter !== 'All') {
      tmp = tmp.filter(c =>
        c.product?.toLowerCase().trim() === productFilter.toLowerCase().trim()
      );
    }

    setFiltered(tmp);
    setCurrentPage(1);
  };

  const handleShowAll = () => {
    setDateRange([null, null]);
    setProductFilter('All');
    setFiltered(contacts);
    setCurrentPage(1);
  };

  // pagination math
  const total = filtered.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const startIdx = (currentPage - 1) * perPage;
  const endIdx = Math.min(startIdx + perPage, total);
  const pageSlice = filtered.slice(startIdx, endIdx);

  const goto = p => setCurrentPage(Math.max(1, Math.min(lastPage, p)));

  return (
    <div className="container" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', padding: 30 }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h1 style={{ color: '#00B5F9', fontWeight: 'bold', fontSize: 36 }}>Contact Us</h1>
        <Button
          type="primary"
          onClick={exportData}
          style={{
            backgroundColor: '#00B5F9',
            borderColor: '#00B5F9',
            borderRadius: 20,
            padding: '8px 24px'
          }}
        >
          Export
        </Button>
      </div>

      {/* Filters: Date range + Product + Buttons */}
      <div className="d-flex flex-wrap align-items-end mb-4" style={{ gap: '1rem' }}>
        {/* Date Range Picker */}
        <div style={{ position: 'relative', minWidth: 280 }}>
          <RangePicker
            value={dateRange}
            onChange={vals => setDateRange(vals)}
            format="M/D/YYYY"
            placeholder={['Enter a date range', '']}
            style={{ width: '100%', borderRadius: 8 }}
            allowClear
          />
          <CalendarOutlined
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 20,
              color: '#888',
            }}
          />
        </div>

        {/* Product filter */}
        <div style={{ minWidth: 200 }}>
          <label style={{ display: 'block', color: '#00B5F9', fontWeight: 600, marginBottom: 4 }}>
            Product Category
          </label>
          <Select
            value={productFilter}
            onChange={v => setProductFilter(v)}
            style={{ width: '100%' }}
          >
            {productOptions.map((opt, i) => <Option key={i} value={opt}>{opt}</Option>)}
          </Select>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            type="primary"
            onClick={handleFilter}
            style={{ backgroundColor: '#00B5F9', borderColor: '#00B5F9', borderRadius: 8 }}
          >
            Filter
          </Button>
          <Button
            onClick={handleShowAll}
            style={{ borderRadius: 8 }}
          >
            Show All
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="card p-4 shadow-sm mb-4" style={{ borderRadius: 10 }}>
        <table className="table table-bordered mb-0">
          <thead style={{ backgroundColor: '#00B5F9', color: '#fff' }}>
            <tr>
              <th>S.No</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Product Category</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {pageSlice.map((c, i) => (
              <tr key={c._id} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td>{startIdx + i + 1}</td>
                <td>{c.fullName}</td>
                <td>{c.email}</td>
                <td>{c.product}</td>
                <td>{c.mobile}</td>
                <td>{c.message}</td>
                <td>{dayjs(c.createdAt).format('MMM D, YYYY, h:mm A')}</td>
              </tr>
            ))}
            {pageSlice.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">No contacts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Pagination Bar */}
      <div className="d-flex align-items-center justify-content-center flex-wrap" style={{ gap: '1rem' }}>
       <span style={{ color: "#000" }}>Items per page:</span>
        <Select
          value={perPage}
          onChange={v => { setPerPage(v); setCurrentPage(1); }}
          style={{ width: 80 }}
        >
          {[5, 10, 25, 100].map(n => <Option key={n} value={n}>{n}</Option>)}
        </Select>

        <span style={{ color: "#000" }}>
          {total === 0 ? "0 of 0" : `${startIdx + 1}–${endIdx} of ${total}`}
        </span>

        <Button
          shape="circle"
          icon={<DoubleLeftOutlined />}
          disabled={currentPage === 1}
          onClick={() => goto(1)}
        />
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          disabled={currentPage === 1}
          onClick={() => goto(currentPage - 1)}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          disabled={currentPage === lastPage}
          onClick={() => goto(currentPage + 1)}
        />
        <Button
          shape="circle"
          icon={<DoubleRightOutlined />}
          disabled={currentPage === lastPage}
          onClick={() => goto(lastPage)}
        />
      </div>
    </div>
  );
};

export default ContactList;
