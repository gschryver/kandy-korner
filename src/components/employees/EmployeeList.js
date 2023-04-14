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
