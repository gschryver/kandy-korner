import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"


export const ApplicationViews = () => {
	// Retrieving the user object from local storage
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.isStaff) {
        // return employees here  
        return <EmployeeViews />       
    } else {
        // return customers here
        return <CustomerViews />
    }
}