import { Outlet, Route, Routes } from "react-router-dom"
import { InventoryList } from "../inventory/Inventory"
import { LocationList } from "../locations/Locations"
import  { CandyContainer } from "../candy/CandyContainer"
import { OrderList } from "../inventory/OrderList"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Indulge in sweet moments at Kandy Korner!</div>

                    <Outlet />
                </>
            }>
                
                <Route path="inventory" element={<InventoryList /> } />
                <Route path="locations" element={ <LocationList /> } /> 
                <Route path="candy" element={<CandyContainer /> } />
                <Route path="orders" element={<OrderList /> } />
            </Route>
        </Routes>
    )
}