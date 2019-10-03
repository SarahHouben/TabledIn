import React from 'react'
import { Link } from "react-router-dom";


const ShowRestaurant = () => {
  return (
    <div>
      <h3>display restaurant info</h3>

      <Link to="/restaurant/edit">
          <button>Edit information</button>
        </Link>

    </div>
  )
}

export default ShowRestaurant
