import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaEnvelope, FaUsers, FaEye } from "react-icons/fa";
import CountUp from "react-countup";
import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#0066ff", "#00ccff", "#ffd700"];
const TEXT_COLOR = "#0c0c0c";
const BACKGROUND = "#f7f9fc";

const ICONS = {
  Contacts: <FaEnvelope size={28} className="me-3" />,
  Visitors: <FaEye size={28} className="me-3" />,
  Subscribers: <FaUsers size={28} className="me-3" />,
};

const HomeDashboard = () => {
  const [counts, setCounts] = useState({
    contacts: 0,
    visitors: 0,
    subscribers: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch counts from the API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [contactRes, visitorRes, subRes] = await Promise.all([
          axios.get("api/admin-contact/count"),
          axios.get("/api/admin-visitors/count"),
          axios.get("/api/admin-subscribe/count"),
        ]);
        setCounts({
          contacts: contactRes.data.count || 0,
          visitors: visitorRes.data.count || 0,
          subscribers: subRes.data.count || 0,
        });
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        console.error("Failed to fetch counts:", err);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Format data for charts
  const chartData = [
    { name: "Contacts", value: counts.contacts },
    { name: "Visitors", value: counts.visitors },
    { name: "Subscribers", value: counts.subscribers },
  ];

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: BACKGROUND,
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Dashboard Heading */}
      <div className="row">
        <div className="col-12 mb-4">
          <h2
            style={{ color: "#00B5F9ff", fontWeight: "700", fontSize: "2rem" }}
          >
            Dashboard Overview
          </h2>
        </div>
      </div>

      {/* Premium Cards */}
      <div className="row mb-5">
        {chartData.map((item, index) => (
          <div className="col-md-4 mb-4" key={item.name}>
            <div
              className="d-flex align-items-center rounded-4 shadow-sm p-4 text-white"
              style={{
                background: `linear-gradient(135deg, ${
                  COLORS[index % COLORS.length]
                } 0%, #0d1117 100%)`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                transition: "transform 0.3s ease",
                height: "100%",
              }}
            >
              {ICONS[item.name]}
              <div>
                <h6 className="mb-1" style={{ fontWeight: "600" }}>
                  {item.name}
                </h6>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "800" }}>
                  {!loading && <CountUp end={item.value} duration={2} />}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row">
        {/* Line Chart */}
        <div className="col-md-6 mb-5">
          <div className="p-4 rounded-4 shadow-sm bg-white">
            <h5
              className="mb-4"
              style={{ color: TEXT_COLOR, fontWeight: "600" }}
            >
              Category Trends
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke={TEXT_COLOR} />
                <YAxis allowDecimals={false} stroke={TEXT_COLOR} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0066ff"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                  animationDuration={1200}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-6 mb-5">
          <div className="p-4 rounded-4 shadow-sm bg-white">
            <h5
              className="mb-4"
              style={{ color: TEXT_COLOR, fontWeight: "600" }}
            >
              Category Distribution
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  animationDuration={1200}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
