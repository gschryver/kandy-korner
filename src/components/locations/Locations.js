import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, updateLocations] = useState([])
    const navigate = useNavigate()

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
            <h2>Locations</h2>
            {
                locations.map(
                    (locationObject) => {
                        return <ul key={`location--${locationObject.id}`}>
                            <li>{locationObject.name}</li>
                            <li>{locationObject.address}</li>
                        </ul>
                    }
                )
            }
        </>
    )
}

