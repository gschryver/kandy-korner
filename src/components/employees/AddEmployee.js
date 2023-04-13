import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = ({ locations, onEmployeeAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [locationId, setLocationId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [payRate, setPayRate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Create user
    const userResponse = await fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        isStaff: true,
      }),
    });

    if (!userResponse.ok) {
      alert("Failed to create user.");
      return;
    }

    const newUser = await userResponse.json();

    // Step 2: Create employee
    const employeeResponse = await fetch("http://localhost:8088/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        payRate: parseFloat(payRate),
        storeId: parseInt(locationId),
        userId: newUser.id,
      }),
    });

    if (employeeResponse.ok) {
      const newEmployee = await employeeResponse.json();
      const location = locations.find((l) => l.id === parseInt(locationId));
      onEmployeeAdded({ ...newEmployee, locationName: location.name, userName: newUser.name, userEmail: newUser.email });


     // Redirect to /employee route without search parameters
  navigate("/employees", { replace: true });

} else {
  alert("Failed to create employee.");
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
        <option value="">Select Location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Pay Rate"
        value={payRate}
        onChange={(e) => setPayRate(e.target.value)}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
