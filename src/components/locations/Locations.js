import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, updateLocations] = useState([])
    // const navigate = useNavigate()

    useEffect(
        () => {
            fetch("http://localhost:8088/locations") 
                .then(res => res.json())
                .then((data) => {
                    updateLocations(data)
                })
        },
        []
    )

    return (
        <>
            <h2 className="pageTitle">Locations</h2>
            {
                locations.map(
                    (locationObject) => {
                        return <ul key={`location--${locationObject.id}`}>
                            <li><h2 className="locationName">{locationObject.name}</h2></li>
                            <li className="locationInfoLabel"><strong>Address:</strong> {locationObject.address}</li>
                            <li className="locationInfoLabel"><strong>Sq. Ft:</strong> {locationObject.squareFootage}</li>
                        </ul>
                    }
                )
            }
        </>
    )
}

