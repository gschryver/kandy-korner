import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const [locations, setLocations] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [locationId, setLocationId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [payRate, setPayRate] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLocations = () => {
      fetch('http://localhost:8088/locations')
        .then(response => response.json())
        .then(data => setLocations(data))
    }

    fetchLocations()
  }, [])

  const handleSubmit = (e) => { // Handles the form submission
    e.preventDefault()

    fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        isStaff: true
      })
    })
    .then(response => response.json())
    .then(newUser => {
      fetch('http://localhost:8088/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // The new employee object
        body: JSON.stringify({
          startDate,
          payRate,
          locationId,
          userId: newUser.id
        })
      })
      .then(() => {
        // Clear the form
        setName('')
        setEmail('')
        setLocationId('')
        setStartDate('')
        setPayRate('')
        // Navigate to the employee list
        navigate('/employees')
      })
    })
  }

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Updates the name state variable
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Updates the email state variable
            required
          />
        </label>
        <label>
          Location:
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)} // Updates the locationId state variable
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
            onChange={(e) => setStartDate(e.target.value)} // Updates the startDate state variable
            required
          />
        </label>
        <label>
          Pay Rate per Hour:
          <input
            type="number"
            step="0.01"
            value={payRate}
            onChange={(e) => setPayRate(e.target.value)} // Updates the payRate state variable     
            required
          />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  )
}

export default AddEmployee // Using export default is more convenient when we only need to export a single object or function from a module
