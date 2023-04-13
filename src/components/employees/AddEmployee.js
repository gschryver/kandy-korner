import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [locationId, setLocationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [payRate, setPayRate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      // Replace the URL with your actual API endpoint
      const response = await fetch('http://localhost:8088/locations');
      const data = await response.json();
      setLocations(data);
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object in users
    const userResponse = await fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        isStaff: true,
      }),
    });
    const newUser = await userResponse.json();

    // Create an object in employees with the userId from the previous step
    await fetch('http://localhost:8088/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        payRate,
        storeId: locationId,
        userId: newUser.id,
      }),
    });

    setName('');
    setEmail('');
    setLocationId('');
    setStartDate('');
    setPayRate('');

    // Navigate to EmployeeList page after adding employee
    navigate('/employees');
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            required
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Pay Rate per Hour:
          <input
            type="number"
            step="0.01"
            value={payRate}
            onChange={(e) => setPayRate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
