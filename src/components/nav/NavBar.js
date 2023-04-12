import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem("kandy_user")) // Retrieve the current user 
  const isStaff = currentUser && currentUser.isStaff // Check if the current user is an employee

  return (
    <ul className="navbar">
        <li className="navbar__item active"><Link className="navbar__link" to="/locations">Locations</Link></li>

        <li className="navbar__item active"><Link className="navbar__link" to="/inventory">Inventory</Link></li>

      {isStaff && (
        // Only display "Add Product" link if the current user is a staff member
        <li className="navbar__item active"><Link className="navbar__link" to="/addProduct">Add Product</Link></li>
      )}

      {currentUser ? (
        // If a user is logged in, render a "Logout" link
        <li className="navbar__item navbar__logout">
        <Link className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("kandy_user");
              navigate("/", { replace: true });
            }}
          >Logout
        </Link>
        </li>
      
      ) : (
        // If no user is logged in, render an empty string
        ""
      
      )}
    
    </ul>
  )
}
