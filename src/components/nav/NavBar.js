import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
  const localKandyUser = localStorage.getItem("kandy_user")
  const kandyUserObject = JSON.parse(localKandyUser)

  console.log(kandyUserObject) // Add this line to check the object in the console


  if (kandyUserObject && kandyUserObject.isStaff) {
      console.log("EmployeeNav")
      return <EmployeeNav />       
  } else {
      console.log("CustomerNav")
      return <CustomerNav />
  }
}