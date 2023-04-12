import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { InventoryList } from "../inventory/Inventory"
import { AddProductForm } from "../inventory/AddProductForm"

export const ApplicationViews = () => {
  const isStaff = true // employee only views 

  return (
    <Routes>
      <Route path="/" element={
          <>
            <h1>Kandy Korner</h1>
            <div>Indulge in sweet moments at Kandy Korner!</div>
            <Outlet />
          </>
        }
      >
        <Route path="locations" element={<LocationList />} />
        <Route path="inventory" element={<InventoryList />} />
        {isStaff && (<Route path="addProduct" element={<AddProductForm />} />)} {/* new product form is only displayed to employees */}
      </Route>
    </Routes>
  )
}
