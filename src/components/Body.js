import { Link } from "react-router-dom";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import { RESTAURANT_API_URL } from "../utils/constant";
import UserContext from "../utils/userContext";
const Body = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { userName, setUserName } = useContext(UserContext);
  
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(RESTAURANT_API_URL);
    const resData = await response.json(); // converts Readable Stream which is in a JSON format to a javascript object;
    // console.log("resData", resData)
    setRestaurantsList(
      resData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredResList(
      resData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
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
        <div className="flex items-center">
          <label>Enter User :</label>
          <input
            className="m-2 border border-solid border-black pl-2 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
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
              {res.info.isOpen ? (
                <RestaurantCardPromoted resData={res} />
              ) : (
                <RestaurantCard resData={res} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
