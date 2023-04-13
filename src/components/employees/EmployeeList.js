import { useState, useEffect } from "react";
import "./employees.css";
import AddEmployee from "./AddEmployee";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await fetch("http://localhost:8088/users?isStaff=true");
      const users = await usersResponse.json();

      const locationsResponse = await fetch("http://localhost:8088/locations");
      const locationData = await locationsResponse.json();

      const employeesResponse = await fetch("http://localhost:8088/employees?_expand=user");
      const employeeData = await employeesResponse.json();

      const mergedData = employeeData.map((employee) => {
        const location = locationData.find((location) => location.id === employee.storeId);
        const user = users.find((user) => user.id === employee.userId);
        return { ...employee, locationName: location.name, userName: user.name, userEmail: user.email };
      });

      setEmployees(mergedData);
      setLocations(locationData);
    };

    fetchData();
  }, []);

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <div>
      <AddEmployee locations={locations} onEmployeeAdded={handleEmployeeAdded} />

      <article className="employees">
        {employees.map((employee) => (
          <section className="employee" key={`employee--${employee.id}`}>
            <div>
              <div>Name: {employee.userName}</div>
              <div>Email: {employee.userEmail}</div>
              <div>Location: {employee.locationName}</div>
              <div>Start Date: {employee.startDate}</div>
              <div>Pay Rate: ${employee.payRate.toFixed(2)} per hour</div>
            </div>
          </section>
        ))}
      </article>
    </div>
  );
};

export default EmployeeList;