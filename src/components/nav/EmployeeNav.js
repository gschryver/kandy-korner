import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem("kandy_user")) // Retrieve the current user 

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/inventory">Inventory</Link>
            </li>

            <li className="navbar__item active">
    <Link className="navbar__link" to="/addProduct">Add Product</Link>
</li>



            {currentUser ? (
                <>
                    {/* Display the user's email */}
                    <li className="navbar__item">
                        <span className="navbar__user-email">Logged in as: {currentUser.email}</span>
                    </li>

                    {/* If a user is logged in, render a "Logout" link */}
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
                </>
      
            ) : (
                // If no user is logged in, render an empty string
                ""
            )}
        </ul>
    )
}
