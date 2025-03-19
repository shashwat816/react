import RestaurantCard from "./RestaurantCard";
import resData from "../utils/mockData";
import { useState } from "react";
const Body = () => {
  const [restaurantsList, setRestaurantsList] = useState(resData);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredlist = restaurantsList.filter(
              (res) => res.info.avgRating >= 4.5
            );
            setRestaurantsList(filteredlist);
          }}
        >
          Top rated restaurants
        </button>
      </div>
      <div className="res-container">
        {restaurantsList.map((res) => {
          return <RestaurantCard key={res.info.id} resData={res} />;
        })}
      </div>
    </div>
  );
};

export default Body;
