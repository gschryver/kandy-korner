import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { LocationList } from '../locations/Locations';
import { InventoryList } from '../inventory/Inventory';
import { CandyContainer } from '../candy/CandyContainer';
import { AddProductForm } from '../inventory/AddProductForm';
import { CustomerList } from '../customers/CustomerList';
import { CustomerDetails } from '../customers/CustomerDetails';
import  EmployeeList  from '../employees/EmployeeList';
import  AddEmployee  from '../employees/AddEmployee'; // Import the AddEmployee component

export const EmployeeViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Kandy Korner</h1>
            <div>Indulge in sweet moments at Kandy Korner!</div>
            <Outlet />
          </>
        }
      >
        <Route path="locations" element={<LocationList />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="candy" element={<CandyContainer />} />
        <Route path="inventory/addProduct" element={<AddProductForm />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/addEmployee" element={<AddEmployee />} /> {/* Add new route for AddEmployee */}
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:customerId" element={<CustomerDetails />} />
      </Route>
    </Routes>
  );
};
