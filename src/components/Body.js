import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
const Body = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.114801552705504&lng=72.86358956247568&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const resData = await response.json(); // converts Readable Stream which is in a JSON format to a javascript object;
    setRestaurantsList(
      resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredResList(
      resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            className="search-box"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              // update the restaurant list with filtered data
              const filterList = restaurantsList.filter((res) => {
                console.log(searchText);
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredResList(filterList);
            }}
          >
            Search
          </button>
        </div>
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
        {filteredResList.map((res) => {
          return <RestaurantCard key={res.info.id} resData={res} />;
        })}
      </div>
    </div>
  );
};

export default Body;
