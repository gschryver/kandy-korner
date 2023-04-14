import { useState, useEffect } from 'react'
import "./employees.css"

const EmployeeList = () => { 
  const [employees, setEmployees] = useState([]) 

  useEffect(() => { // 
    const fetchEmployees = () => { 
      fetch('http://localhost:8088/employees') 
        .then(response => response.json()) 
        .then(data => {
          Promise.all(data.map(employee => { // Map over the employee data and fetch the corresponding user and location data for each employee
            const fetchUser = fetch(`http://localhost:8088/users/${employee.userId}`).then(userResponse => userResponse.json()) // Fetch the user data for the current employee
            const fetchLocation = fetch(`http://localhost:8088/locations/${employee.locationId}`).then(locationResponse => locationResponse.json()) // Fetch the location data for the current employee

            Promise.all([fetchUser, fetchLocation]) // When both the user and location data are fetched, combine it with the employee data and update the state
              .then(([userData, locationData]) => {
                const employeesWithUserAndLocation = { // Creates a new object that includes the employee data, user data, and location data
                  ...employee,
                  name: userData.name,
                  email: userData.email,
                  location: locationData.name, 
                }
                setEmployees(prevEmployees => [...prevEmployees, employeesWithUserAndLocation]) // Updates the state with the new employee data
              })
          }))
        })
    }

    fetchEmployees() 
  }, []) 

  return ( // Renders the employee data
  <div>
    <h2 className="employee-title">Employee List</h2>
    <article className="employees">
        {employees.map((employee) => ( 
          <section className="employee" key={employee.id}> 
            <div>Name: {employee.name}</div> 
            <div>Email: {employee.email}</div>  
            <div>Location: {employee.location}</div>  
            <div>Start Date: {employee.startDate}</div>  
            <div>Pay Rate: ${parseFloat(employee.payRate).toFixed(2)}</div>
          </section> 
        ))}
      </article>
    </div>
  )
}

export default EmployeeList 
