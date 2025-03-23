import { Link } from "react-router-dom";
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
      <div className="flex">
        <div className="m-4 p-4">
          <input
            className="border border-solid border-black pl-2 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="mx-4 px-4 bg-green-200 rounded-md"
            onClick={() => {
              // update the restaurant list with filtered data
              const filterList = restaurantsList.filter((res) => {
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
        <div className="flex items-center">
          <button
            className="mx-4 px-4 bg-green-200 rounded-md"
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
      </div>
      <div className="flex flex-wrap">
        {filteredResList.map((res) => {
          return (
            <Link
              key={res.info.id}
              to={"/restaurant/menu/" + res.info.id}
              className="menu-link-card"
            >
              <RestaurantCard resData={res} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
