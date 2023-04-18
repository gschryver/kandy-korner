import { useEffect, useState } from "react"
import "./Inventory.css"

export const InventoryList = () => {
    const [inventory, setInventory] = useState([])
    const [filteredInventory, setFilteredInventory] = useState([])
    const [showTopPriced, setShowTopPriced] = useState(false)
  
    useEffect(() => {
      fetch('http://localhost:8088/inventory?_expand=type&_sort=name')
        .then(res => res.json())
        .then(data => {
          setInventory(data)
        })
    }, [])
   
    // Filter the inventory by price and update the filteredInventory state when the showTopPriced state changes
    useEffect(() => {
      if (showTopPriced) { 
        const topPriced = inventory.filter(inventoryObject => inventoryObject.pricePerUnit > 2)
        setFilteredInventory(topPriced)
      } else {
        setFilteredInventory(inventory)
      }
    }, [inventory, showTopPriced])

  
    const handlePurchase = (inventoryId) => {
      const currentUser = JSON.parse(localStorage.getItem("kandy_user")) // retrieve the current user from local storage
      const currentUserId = currentUser.id
  
      // Create a new purchase object with the correct information
      const newPurchase = {
        customerId: currentUserId,
        productId: inventoryId,
        quantity: 1, 
        storeId: 1 
      }
  
      // Store the new purchase object in the database
      fetch('http://localhost:8088/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPurchase)
      })
        .then(res => res.json())
        .then(data => {
          console.log('New purchase object:', data)
        })
    }
  
    return (
      <>
        <h2 className="pageTitle">Inventory</h2>
        <button className="top-priced-button" onClick={() => setShowTopPriced(!showTopPriced)}>Sort by Top Priced</button>
        {filteredInventory.map((inventoryObject) => {
          const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(inventoryObject.pricePerUnit)
          return (
            <ul key={`inventory--${inventoryObject.id}`}>
              <li>
                <h2 className="inventoryName">
                  {inventoryObject.name} - {formattedPrice} [{inventoryObject.type.name}]
                  <button onClick={() => handlePurchase(inventoryObject.id)}>Purchase</button>
                </h2>
              </li>
            </ul>
          )
        })}
      </>
    )
  }