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
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import { FaEnvelope, FaUsers, FaEye } from "react-icons/fa";
import CountUp from "react-countup";
import { useMediaQuery } from 'react-responsive';

const HomeDashboard = () => {
  const [counts, setCounts] = useState({
    contacts: 0,
    visitors: 0,
    subscribers: 0,
  });

  const [loading, setLoading] = useState(true);

  // Media queries for responsive design
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    const savedCounts = localStorage.getItem("counts");
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
      setLoading(false);
    } else {
      const fetchCounts = async () => {
        try {
          const [contactRes, visitorRes, subRes] = await Promise.all([
            axios.get("/api/admin-contact/count"),
            axios.get("/api/admin-visitors/count"),
            axios.get("/api/admin-subscribe/count"),
          ]);
          const newCounts = {
            contacts: contactRes.data.count || 0,
            visitors: visitorRes.data.count || 0,
            subscribers: subRes.data.count || 0,
          };
          localStorage.setItem("counts", JSON.stringify(newCounts));
          setCounts(newCounts);
          setLoading(false);
        } catch (err) {
          console.error("Failed to fetch counts:", err);
          setLoading(false);
        }
      };
      fetchCounts();
    }
  }, []);

  const chartData = [
    { name: "Contacts", value: counts.contacts },
    { name: "Visitors", value: counts.visitors },
    { name: "Subscribers", value: counts.subscribers },
  ];

  const pieColors = [
    'rgba(155, 49, 146, 0.8)',
    'rgba(89, 11, 247, 0.8)',
    'rgba(251, 122, 58, 0.8)',
  ];

  // Responsive grid columns
  const getGridColumns = () => {
    if (isMobile) return '1fr';
    if (isTablet) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  // Responsive chart container height
  const getChartHeight = () => {
    if (isMobile) return 250;
    return 320;
  };

  return (
    <div style={{ 
      padding: isMobile ? '16px' : '24px',
      backgroundColor: '#f0f4f8',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(at 40% 20%, hsla(212,100%,74%,0.2) 0px, transparent 50%)'
    }}>
      {/* Dashboard Heading */}
      <h2 style={{
        color: '#1a365d',
        fontWeight: '600',
        fontSize: isMobile ? '1.5rem' : '1.75rem',
        marginBottom: isMobile ? '20px' : '28px',
        textShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '16px' : '24px',
        marginBottom: isMobile ? '24px' : '32px'
      }}>
        {chartData.map((item, index) => (
          <div key={item.name} style={{
            background: index === 0 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 
                        index === 1 ? 'linear-gradient(135deg, #43e97b, #38f9d7)' : 
                        'linear-gradient(135deg, #fe9496, #ff6b6b)',
            borderRadius: '16px',
            padding: isMobile ? '16px' : '24px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            color: 'white',
            minHeight: isMobile ? '120px' : '160px'
          }}>
            
            {/* Large overlapping circle */}
            <div style={{
              position: 'absolute',
              right: '-30px',
              top: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)'
            }}></div>
            
            {/* Small overlapping circle */}
            <div style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                marginBottom: isMobile ? '12px' : '16px',
                fontWeight: '500',
                opacity: 0.9
              }}>{item.name}</p>
              
              <p style={{
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                fontWeight: '700',
                margin: '0 0 8px 0',
                lineHeight: '1.2'
              }}>
                {!loading ? (
                  <>
                    {/* {index === 0 && '$ '} */}
                    <CountUp 
                      end={item.value} 
                      duration={2.5} 
                      separator=","
                    />
                  </>
                ) : '--'}
              </p>
              
              {/* Trend indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                opacity: 0.9
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px'
                }}>
                  {index !== 1 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span>
                  {index !== 1 ? 'Increased' : 'Decreased'} by {index === 0 ? '40%' : index === 1 ? '10%' : '5%'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: isMobile ? '20px' : '28px'
      }}>
        {/* Modern Area Chart */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '14px',
          padding: isMobile ? '16px' : '22px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glass overlay effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(30deg)',
            animation: 'shine 6s infinite linear',
            zIndex: 0
          }}></div>
          
          <h3 style={{
            color: '#1a365d',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '600',
            marginBottom: isMobile ? '14px' : '18px',
            position: 'relative',
            zIndex: 1
          }}>Category Trends</h3>
          <div style={{ height: getChartHeight(), position: 'relative', zIndex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis 
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: isMobile ? 10 : 12 }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(203, 213, 224, 0.5)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(4px)',
                    padding: '12px',
                    fontSize: isMobile ? '12px' : '14px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6"
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                  activeDot={{ r: isMobile ? 4 : 6, stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '14px',
          padding: isMobile ? '16px' : '22px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(30deg)',
            animation: 'shine 6s infinite linear',
            zIndex: 0
          }}></div>
          
          <h3 style={{
            color: '#1a365d',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '600',
            marginBottom: isMobile ? '14px' : '18px',
            position: 'relative',
            zIndex: 1
          }}>Category Distribution</h3>
          <div style={{ height: getChartHeight(), position: 'relative', zIndex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 70 : 90}
                  innerRadius={isMobile ? 30 : 50}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={pieColors[index % pieColors.length]}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: isMobile ? '0.75rem' : '0.85rem'
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(203, 213, 224, 0.5)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(4px)',
                    padding: '12px',
                    fontSize: isMobile ? '12px' : '14px'
                  }}
                  formatter={(value, name, props) => [value, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: rotate(30deg) translate(-30%, -30%); }
          100% { transform: rotate(30deg) translate(30%, 30%); }
        }
      `}</style>
    </div>
  );
};

export default HomeDashboard;