import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

// displays the full name, email, phone number, and address of customer when 
// the customer's name is clicked in the list view 
export const CustomerDetails = () => {
  const { customerId } = useParams() // extracts the 'customerId' parameter from the URL
  const [customer, setCustomer] = useState("") // initializes state for the customer
  const [loyaltyNumber, setLoyaltyNumber] = useState("") // initializes state for the loyalty number

  // fetches the customer with the specified ID and the associated user object
  const fetchCustomer = () => {
    fetch(`http://localhost:8088/customers/${customerId}?_expand=user`)
      .then(res => res.json())
      .then(setCustomer)
  }
  // this ensures that the customer information is fetched initially when the component is rendered
    useEffect(() => {
      fetchCustomer() 
    }, [customerId]) // the dependency array ensures that the fetchCustomer function is only called when the customerId changes

    // reset form after the loyalty number is updated
    const resetForm = () => {
      setLoyaltyNumber("")
    }

    // updates the customer's loyalty number
    const handleUpdateLoyaltyNumber = (event) => {
      event.preventDefault()
      fetch(`http://localhost:8088/customers/${customerId}?_expand=user`, { // fetches the customer with the specified ID and the associated user object
          method: "PATCH", // we can use "patch" instead of "put" as it is only affecting one property
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              loyaltyNumber
          })
      })
      .then(response => response.json())
      // object representing the customer with the updated loyalty number
      .then(updatedCustomer => {  // if we successfully update the loyalty number, we will update the customer state variable
        console.log(updatedCustomer)
        // then we are going to fetch the customer again to ensure that the customer info & associated user object is always up to date in state 
          fetchCustomer()
          resetForm()
      })
    } 
      
    return customer &&  (
      <article className="customerContainer">
        <section className="customerDetails">
          <h2>{customer.user.name}</h2> 
          <p className="customerLabel"><strong>Email:</strong> {customer.user.email}</p>
          <p className="customerLabel"><strong>Loyalty Number:</strong> {customer.loyaltyNumber}</p>  
        </section>
        <section className="loyaltyForm">
          <h2 className="loyaltyHeading">Update Loyalty Number</h2>
          <form className="loyaltyForm">
            <fieldset>
              <div className="form-group">
                <label htmlFor="loyaltyNumber">Loyalty Number: </label>
                <input 
                  type="text" 
                  id="loyaltyNumber" 
                  required autoFocus 
                  className="form-control" 
                  placeholder="Loyalty Number" 
                  value={loyaltyNumber}
                  onChange={(event) => setLoyaltyNumber(event.target.value)}
                  />
                </div>
                </fieldset>
              </form>   
              <button className="updateLoyaltyButton" onClick={handleUpdateLoyaltyNumber}>Update Loyalty Number</button>
        </section>
      </article>
      )
}