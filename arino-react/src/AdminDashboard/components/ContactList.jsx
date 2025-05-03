import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePicker, Select, Button, Pagination } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';

const { Option } = Select;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productFilter, setProductFilter] = useState('');

  const contactsPerPage = 5;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("/api/admin-contact");
        setContacts(res.data);
        setFilteredContacts(res.data);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    let filtered = [...contacts];

    // Filter by date
    if (startDate && endDate) {
      filtered = filtered.filter(contact => {
        const created = dayjs(contact.createdAt);
        return created.isAfter(dayjs(startDate).subtract(1, 'day')) && created.isBefore(dayjs(endDate).add(1, 'day'));
      });
    }

    // Updated Filter by product (case- and space-insensitive)
    if (productFilter && productFilter !== "All") {
      filtered = filtered.filter(contact =>
        contact.product?.toLowerCase().trim() === productFilter.toLowerCase().trim()
      );
    }

    setFilteredContacts(filtered);
    setCurrentPage(1);
  }, [startDate, endDate, productFilter, contacts]);

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast);

  const exportData = () => {
    const exportData = filteredContacts.map((c, i) => ({
      SNo: i + 1,
      Name: c.fullName,
      Email: c.email,
      Product: c.product,
      Mobile: c.mobile,
      Message: c.message,
      CreatedOn: new Date(c.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, `Contact_List_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const productOptions = ["All", "Defence", "Ground", "Space", "Others"];

  return (
    <div className="container" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', paddingTop: '30px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h1 style={{ color: '#00B5F9', fontWeight: 'bold', fontSize: '36px' }}>Contact Us</h1>
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
        <div className="col-md-3">
          <label htmlFor="productFilter" style={{ color: '#00B5F9', fontWeight: 600 }}>Product Category</label>
          <Select
            id="productFilter"
            style={{ width: '100%' }}
            value={productFilter}
            onChange={value => setProductFilter(value)}
            placeholder="Select Product"
          >
            {productOptions.map((option, i) => (
              <Option key={i} value={option}>{option}</Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="card p-4 shadow-sm" style={{ borderRadius: '10px' }}>
        <table className="table table-bordered">
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
            {currentContacts.map((contact, index) => (
              <tr key={contact._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{contact.fullName}</td>
                <td>{contact.email}</td>
                <td>{contact.product}</td>
                <td>{contact.mobile}</td>
                <td>{contact.message}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center my-5">
        <Pagination
          current={currentPage}
          total={filteredContacts.length}
          pageSize={contactsPerPage}
          onChange={page => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ContactList;
