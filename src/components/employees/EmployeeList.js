import { useState, useEffect } from 'react'
import './employees.css'

const EmployeeList = () => {
const [employees, setEmployees] = useState([])

    useEffect(() => {
      const fetchEmployees = () => {
        fetch('http://localhost:8088/employees?_expand=user&_expand=location')
          .then(response => response.json())
          .then(data => {
            const employeesWithUserAndLocation = data.map(employee => ({ // Maps the employee data to a new object with the user and location data added
              ...employee, // spread operator to copy the properties of the employee object
              name: employee.user.name,
              email: employee.user.email,
              location: employee.location.name,
            }))

            setEmployees(employeesWithUserAndLocation)
          })
      }

      fetchEmployees() // called when the component is initialized
    }, [])

    // functionality to 'fire' an employee >:( 
    // end stage capitalism, baby 
    const fireEmployee = (employeeId) => { // takes the employee id as an argument
      const employee = employees.find((employee) => employee.id === employeeId) // find the employee in the array of employees
      const userId = employee.user.id // get the user id from the employee object
    
      // Delete the employee and user from the database
      fetch(`http://localhost:8088/employees/${employeeId}`, { // delete the employee from the database
        method: 'DELETE',
      })
        .then(() => fetch(`http://localhost:8088/users/${userId}`, { // delete the user from the database
          method: 'DELETE' 
        }))
        .then(() => {
          const updatedEmployees = employees.filter((employee) => employee.id !== employeeId)
          setEmployees(updatedEmployees)
        })
    }
    
    return ( // renders the employee data 
        <div>
          <h2 className="employee-title">Employee List</h2>
          <article className="employees">
            {employees.map(employee => (
              <section className="employee" key={employee.id}>
                <div><strong>Name:</strong> {employee.name}</div>
                <div><strong>Email:</strong>  {employee.email}</div>
                <div><strong>Location:</strong>  {employee.location}</div>
                <div><strong>Start Date:</strong>  {employee.startDate}</div>
                <div><strong>Pay Rate:</strong> ${parseFloat(employee.payRate).toFixed(2)}</div>
                <button 
                  className="fireEmployeeButton"
                  onClick={() => fireEmployee(employee.id)}>Fire Employee</button> 
              </section>
            ))}
          </article>
        </div>
      )
    }

export default EmployeeList
