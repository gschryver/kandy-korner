import React, { useState, useEffect } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      // Replace the URL with your actual API endpoint
      const response = await fetch('http://localhost:8088/employees');
      const data = await response.json();

      // Fetch the user associated with each employee
      const employeesWithUser = await Promise.all(data.map(async (employee) => {
        const userResponse = await fetch(`http://localhost:8088/users/${employee.userId}`);
        const userData = await userResponse.json();
        return {
          ...employee,
          name: userData.name,
          email: userData.email,
        };
      }));

      setEmployees(employeesWithUser);
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.email} - Location: {employee.location} - Start Date: {employee.startDate} - Pay Rate: ${employee.payRate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
