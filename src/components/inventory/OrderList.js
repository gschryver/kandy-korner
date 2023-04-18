import { useEffect, useState } from "react"
import "./Inventory.css"

export const OrderList = () => {
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    // ID of the current user
    const currentUser = JSON.parse(localStorage.getItem("kandy_user"))
    const currentUserId = currentUser.id

    // fetch all purchases for the current user
    fetch(`http://localhost:8088/purchases?customerId=${currentUserId}`) 
    .then(response => response.json()) // parse the JSON response
    .then(data => { // data is the array of purchases
        const purchaseData = [] // empty array to store the purchase data 
        data.forEach(purchase => { // for each purchase, fetch the inventory item and add it to the purchase object
            fetch(`http://localhost:8088/inventory/${purchase.productId}`)
                .then(response => response.json())
                .then(inventory => {
                    purchaseData.push({ ...purchase, inventory }) // spread the purchase object and add the inventory object to it
                    if (purchaseData.length === data.length) { // when all the inventory objects have been added to the purchase objects
                        setPurchases(purchaseData) // update state
                    }
                })
            })
        })
     }, [])

        return (
            <>
            <h2 className="pageTitle">My Orders</h2>
            <ul className="orderList">
                {purchases.map(purchase => ( // map over the purchases array and display the name and price of each item
                <li key={purchase.id} className="orderListItem">
                    {purchase.inventory.name} - ${purchase.inventory.pricePerUnit.toFixed(2)}
                </li>
                ))}
            </ul>
            </>
        )
        }
