import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bugs');
      const data = await response.json();
      setBugs(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createBug = async (e) => {
    e.preventDefault();
    if (!title) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority })
      });
      const newBug = await response.json();
      setBugs([newBug, ...bugs]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bugs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const updatedBug = await response.json();
      setBugs(bugs.map(bug => bug._id === id ? updatedBug : bug));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteBug = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/bugs/${id}`, {
        method: 'DELETE'
      });
      setBugs(bugs.filter(bug => bug._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#faf7f2',
      margin: 0,
      padding: '30px 40px'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '1600px', 
        margin: '0 auto'
      }}>
        
        {/* Header */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px 40px', 
          borderRadius: '20px',
          marginBottom: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          width: '100%'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '600', 
            margin: '0 0 8px 0',
            color: '#1e2b3c'
          }}>
            🐞 Bug Tracker
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#546e7a', 
            margin: '0'
          }}>
            Track, manage, and squash bugs with ease
          </p>
        </div>

        {/* Form */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px 40px', 
          borderRadius: '20px',
          marginBottom: '32px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          width: '100%'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#1e2b3c', margin: '0 0 24px 0' }}>
            📋 Report New Bug
          </h2>
          <form onSubmit={createBug}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Bug title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  padding: '14px 18px',
                  border: '1px solid #d0d7de',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: '#1a2634',
                  width: '100%'
                }}
                required
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  padding: '14px 18px',
                  border: '1px solid #d0d7de',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: '#1a2634',
                  width: '100%'
                }}
              />
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{
                    padding: '14px 20px',
                    border: '1px solid #d0d7de',
                    borderRadius: '12px',
                    fontSize: '15px',
                    backgroundColor: 'white',
                    color: '#1a2634',
                    flex: 1,
                    cursor: 'pointer'
                  }}
                >
                  <option value="Low">🐢 Low Priority</option>
                  <option value="Medium">📊 Medium Priority</option>
                  <option value="High">🔥 High Priority</option>
                </select>
                <button
                  type="submit"
                  style={{
                    padding: '14px 32px',
                    backgroundColor: '#4f6f8f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#3e5a74'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4f6f8f'}
                >
                  Create Bug
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 3 Columns - FULL WIDTH */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '24px',
          width: '100%'
        }}>
          
          {/* Open Column */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            width: '100%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1e2b3c', margin: 0 }}>
                📌 Open
              </h3>
              <span style={{ 
                backgroundColor: '#e9ecf0', 
                color: '#4f6f8f', 
                padding: '4px 12px', 
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {bugs.filter(b => b.status === 'Open' || !b.status).length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              {bugs.filter(b => b.status === 'Open' || !b.status).map(bug => (
                <BugCard 
                  key={bug._id} 
                  bug={bug} 
                  onStatusChange={updateStatus} 
                  onDelete={deleteBug}
                  column="Open"
                />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            width: '100%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1e2b3c', margin: 0 }}>
                ⚙️ In Progress
              </h3>
              <span style={{ 
                backgroundColor: '#e9ecf0', 
                color: '#4f6f8f', 
                padding: '4px 12px', 
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {bugs.filter(b => b.status === 'In Progress').length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              {bugs.filter(b => b.status === 'In Progress').map(bug => (
                <BugCard 
                  key={bug._id} 
                  bug={bug} 
                  onStatusChange={updateStatus} 
                  onDelete={deleteBug}
                  column="In Progress"
                />
              ))}
            </div>
          </div>

          {/* Closed Column */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            width: '100%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1e2b3c', margin: 0 }}>
                ✅ Closed
              </h3>
              <span style={{ 
                backgroundColor: '#e9ecf0', 
                color: '#4f6f8f', 
                padding: '4px 12px', 
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {bugs.filter(b => b.status === 'Closed').length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              {bugs.filter(b => b.status === 'Closed').map(bug => (
                <BugCard 
                  key={bug._id} 
                  bug={bug} 
                  onStatusChange={updateStatus} 
                  onDelete={deleteBug}
                  column="Closed"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BugCard({ bug, onStatusChange, onDelete, column }) {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return { bg: '#ffe2dd', text: '#ac3c3c' };
      case 'Medium': return { bg: '#fff0d9', text: '#9d6b2b' };
      case 'Low': return { bg: '#e1ecf4', text: '#2c628b' };
      default: return { bg: '#f0f2f5', text: '#4f5b66' };
    }
  };

  const colors = getPriorityColor(bug.priority);

  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      borderRadius: '14px', 
      padding: '18px',
      border: '1px solid #e6ecf0',
      width: '100%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#1e2b3c', margin: 0 }}>{bug.title}</h4>
        <button 
          onClick={() => onDelete(bug._id)}
          style={{
            background: 'none',
            border: 'none',
            color: '#8f9aa7',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 4px',
            lineHeight: 1
          }}
          onMouseEnter={(e) => e.target.style.color = '#ac3c3c'}
          onMouseLeave={(e) => e.target.style.color = '#8f9aa7'}
        >
          ×
        </button>
      </div>
      
      {bug.description && (
        <p style={{ color: '#4f5b66', fontSize: '14px', margin: '0 0 14px 0', lineHeight: '1.5' }}>
          {bug.description}
        </p>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ 
          padding: '4px 14px', 
          borderRadius: '30px', 
          fontSize: '12px', 
          fontWeight: '500',
          backgroundColor: colors.bg,
          color: colors.text
        }}>
          {bug.priority}
        </span>
        
        <div style={{ display: 'flex', gap: '6px' }}>
          {column === 'Open' && (
            <button 
              onClick={() => onStatusChange(bug._id, 'In Progress')}
              style={{
                padding: '6px 14px',
                backgroundColor: '#4f6f8f',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3e5a74'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4f6f8f'}
            >
              Start
            </button>
          )}
          
          {column === 'In Progress' && (
            <>
              <button 
                onClick={() => onStatusChange(bug._id, 'Closed')}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#3e7a5c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2e5e46'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3e7a5c'}
              >
                Done
              </button>
              <button 
                onClick={() => onStatusChange(bug._id, 'Open')}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#6d7a89',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6572'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6d7a89'}
              >
                Back
              </button>
            </>
          )}
          
          {column === 'Closed' && (
            <button 
              onClick={() => onStatusChange(bug._id, 'Open')}
              style={{
                padding: '6px 14px',
                backgroundColor: '#6d7a89',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6572'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6d7a89'}
            >
              Reopen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;