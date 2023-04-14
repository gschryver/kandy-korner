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
            ...employee,
            name: employee.user.name,
            email: employee.user.email,
            location: employee.location.name,
          }))

          setEmployees(employeesWithUserAndLocation)
        })
    }

    fetchEmployees()
  }, [])

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
          </section>
        ))}
      </article>
    </div>
  )
}

export default EmployeeList
