import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './employees.css'

// From the React docs: “we recommend to split state into multiple state variables based on which values tend to change together”
// imo this is easier to manage 
// could possibly use reducer?? in the future for more complex state management 8) 
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
      fetch('http://localhost:8088/locations') // get list of locations from the server
        .then(response => response.json())
        .then(data => setLocations(data))
    }

    fetchLocations() // call the function to fetch the locations
  }, []) 

  const handleSubmit = (e) => { // triggers when the form is submitted
    e.preventDefault() // prevents the default behavior of the form submission

    // object creation for the new employee and user
    // we're going to do all of this server-side, so we need to make multiple requests to the server
    // create user > grab user object > save in variable > create employee > pass user id to employee object > save employee object
    fetch('http://localhost:8088/users', { // request to the URL for creating a new user on the server
      method: 'POST', // create a new user 
      headers: {
        'Content-Type': 'application/json' // data in json format 
      },
      body: JSON.stringify({ // converts the data to be sent to the server into a JSON string, and grabs the value of the following from the state
        name, 
        email, 
        isStaff: true 
      })
    })
    .then(response => response.json()) // parse the response (user) from the server as a JSON object 
    .then(newUser => { // retrieve the newly created user object from the previous response and store it in a variable (newUser)
      fetch('http://localhost:8088/employees', { // request to the URL for creating a new employee on the server
        method: 'POST', // create a new employee
        headers: {
          'Content-Type': 'application/json' 
        },
        // creates a new employee object with the data to be sent to the server
        body: JSON.stringify({ // this will be converted to a JSON string and sent to the server
          startDate, 
          payRate, 
          locationId, 
          userId: newUser.id // set the descriptive 'userId' property to the mapped id of the newly created user object
        })
      })
      .then(() => { 
        // clear the form by setting the corresponding state variables to empty strings
        setName('')
        setEmail('')
        setLocationId('')
        setStartDate('')
        setPayRate('')
        // navigate to the employee list page
        navigate('/employees')
      })
    })
  }

  return (
    <div>
      <h2 className="employeeTitle">Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label className="formLabel">
          Name:
          <input className="formInput" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </label>
        <label className="formLabel">
          Email:
          <input className="formInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </label>
        <label className="formLabel">
          Location:
          <select className="formInput"
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
        <label className="formLabel">
          Start Date:
          <input className="formInput"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)} 
            required
          />
        </label>
        <label className="formLabel">
          Hourly Pay Rate:
          <input className="formInput"
            type="number"
            step="0.01" // allows the user to enter a decimal value and increments the value by 0.01 or 1 cent
            value={payRate}
            onChange={(e) => setPayRate(e.target.value)}      
            required
          />
        </label>
        {/* triggers the 'handleSubmit' function when the form is submitted */}
        <button className="employee-button" type="submit">Add Employee</button>
      </form>
    </div>
  )
}

export default AddEmployee // Using export default is more convenient when we only need to export a single object or function from a module
