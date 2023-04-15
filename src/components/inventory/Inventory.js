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

  
    return (
        <>
          <h2 className="pageTitle">Inventory</h2>
          <button className="top-priced-button" onClick={() => setShowTopPriced(!showTopPriced)}>Sort by Top Priced</button> {/* toggle button */}
          {/* Map over the filteredInventory array and display the inventory objects */}
          {filteredInventory.map(
            (inventoryObject) => {
            const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(inventoryObject.pricePerUnit) // format price as $0.00 
              return (
                <ul key={`inventory--${inventoryObject.id}`}>
                  <li>
                    <h2 className="inventoryName">
                      {inventoryObject.name} - {formattedPrice} [{inventoryObject.type.name}]
                    </h2>
                  </li>
                </ul>
              )
            }
          )}
        </>
      )
  }
