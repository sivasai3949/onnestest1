// src/components/SubscriptionList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DatePicker, Select, Button } from "antd";
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;
const { Option } = Select;

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // fetch on mount
  useEffect(() => {
    axios
      .get("/api/admin-subscribe")
      .then((res) => {
        setSubscriptions(res.data);
        setFiltered(res.data);
      })
      .catch(console.error);
  }, []);

  // export to Excel
  const exportData = () => {
    const rows = filtered.map((sub, i) => ({
      SNo: i + 1,
      Email: sub.email,
      SubscribedOn: new Date(sub.createdAt).toLocaleString(),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subscriptions");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf]),
      `Subscription_List_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  // apply or clear date filter
  const handleFilter = () => {
    const [start, end] = dateRange;
    let tmp = [...subscriptions];
    if (start && end) {
      tmp = tmp.filter((s) => {
        const d = dayjs(s.createdAt);
        return d.isSameOrAfter(start, "day") && d.isSameOrBefore(end, "day");
      });
    }
    setFiltered(tmp);
    setCurrentPage(1);
  };
  const handleShowAll = () => {
    setDateRange([null, null]);
    setFiltered(subscriptions);
    setCurrentPage(1);
  };

  // pagination math
  const total = filtered.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const startIdx = (currentPage - 1) * perPage;
  const endIdx = Math.min(startIdx + perPage, total);
  const pageSlice = filtered.slice(startIdx, endIdx);

  const goto = (p) => setCurrentPage(Math.max(1, Math.min(lastPage, p)));

  return (
    <div
      className="container"
      style={{ minHeight: "100vh", backgroundColor: "#f4f6f9", paddingTop: 30 }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h1 style={{ color: "#00B5F9", fontWeight: "bold", fontSize: 36 }}>
          Subscribed Emails
        </h1>
        <Button
          type="primary"
          onClick={exportData}
          style={{
            backgroundColor: "#00B5F9",
            borderColor: "#00B5F9",
            borderRadius: 20,
            padding: "8px 24px",
          }}
        >
          Export
        </Button>
      </div>

      {/* Date Range + Buttons */}
      <div
        className="d-flex align-items-center mb-4 flex-wrap"
        style={{ gap: "1rem" }}
      >
        <div style={{ position: "relative", minWidth: 280 }}>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            format="M/D/YYYY"
            placeholder={["Enter a date range", ""]}
            style={{ width: "100%", borderRadius: 8 }}
            allowClear
          />
          <CalendarOutlined
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 20,
              color: "#888",
            }}
          />
        </div>
        <Button
          type="primary"
          onClick={handleFilter}
          style={{
            backgroundColor: "#00B5F9",
            borderColor: "#00B5F9",
            borderRadius: 8,
          }}
        >
          Filter
        </Button>
        <Button onClick={handleShowAll} style={{ borderRadius: 8 }}>
          Show All
        </Button>
      </div>

      {/* Table */}
      <div className="card p-4 shadow-sm" style={{ borderRadius: 10 }}>
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#00B5F9", color: "#fff" }}>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Subscribed On</th>
            </tr>
          </thead>
          <tbody>
            {pageSlice.map((sub, idx) => (
              <tr
                key={sub._id}
                style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff" }}
              >
                <td>{startIdx + idx + 1}</td>
                <td>{sub.email}</td>
                <td>{new Date(sub.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {pageSlice.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Pagination Bar */}
      <div
        className="d-flex align-items-center justify-content-center flex-wrap"
        style={{ gap: "1rem", marginTop: "1.5rem" }} // ← added marginTop here
      >
        <span style={{ color: "#000" }}>Items per page:</span>
        <Select
          value={perPage}
          onChange={(v) => {
            setPerPage(v);
            setCurrentPage(1);
          }}
          style={{ width: 80 }}
        >
          {[5, 10, 25, 100].map((n) => (
            <Option key={n} value={n}>
              {n}
            </Option>
          ))}
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

export default SubscriptionList;
