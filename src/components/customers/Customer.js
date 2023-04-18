import { Link } from "react-router-dom" 

export const Customer = ({ customer }) => {
    return (
      <div className="customerLink"> 
            { /*Link component that displays the customer's 
            full name and links to the customer details 
            page*/ }
            <Link to={`/customers/${customer.id}`}>{customer.user.name}</Link> 
      </div>
    )
}