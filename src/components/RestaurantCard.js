import { useContext } from "react";
import { IMG_URL } from "../utils/constant";
import userContext from "../utils/userContext";

const RestaurantCard = (props) => {

  const {userName} = useContext(userContext);
  const { resData } = props;
  const { name, cuisines, avgRating, areaName, cloudinaryImageId, isOpen } =
    resData?.info;

  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg"
        alt="img-logo"
        src={IMG_URL + cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating}</h4>
      <h4>{areaName}</h4>
      <h4>Logged In User - {userName}</h4>
    </div>
  );
};


// HOC -->>>> Higher Order Component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
      return (
          <div className="relative">
              <label className="absolute top-0 right-0 bg-gray-500 text-white rounded-md">Open Now</label>
              <RestaurantCard {...props}/>
          </div>
      )
  }

}
export default RestaurantCard;
