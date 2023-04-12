import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { InventoryList } from "../inventory/Inventory"



export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Indulge in sweet moments at Kandy Korner!</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
                <Route path="inventory" element={ <InventoryList /> } />
            </Route>
        </Routes>
    )
}