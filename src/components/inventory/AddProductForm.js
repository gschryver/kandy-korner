import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const AddProductForm = () => {
 
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [typeId, setTypeId] = useState("")
  const [price, setPrice] = useState("")
  const [types, setTypes] = useState([])

  // fetches a list of product types, then stores them in a variable
  useEffect(() => {
    fetch("http://localhost:8088/types")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data)
      })
  }, [])

  // form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // object containing the name, typeId, and price of the product
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        typeId,
        pricePerUnit: parseFloat(price),
      }),
    }

    fetch("http://localhost:8088/inventory", requestOptions)
    navigate("/addProduct")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="typeId">Product type:</label>
        <select
          id="typeId"
          value={typeId}
          onChange={(event) => setTypeId(event.target.value)}
          required
        >
          <option value="">Select type</option>
          {types.map((type) => (
            // Displays a dropdown for each product type 
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  )
}
