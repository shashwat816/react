import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const menuList = useRestaurantMenu(resId);

  if (!menuList) {
    return <h1>Loading.....</h1>;
  }

  const { name, cuisines, avgRating, costForTwoMessage } =
    menuList?.cards[2]?.card?.card?.info;

  const { itemCards } =
    menuList?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;

  return (
    <div>
      <h1>{name}</h1>
      <h4>{cuisines}</h4>
      <h4>{avgRating}</h4>
      <h4>{costForTwoMessage}</h4>
      <ul>
        {itemCards?.map((item) => {
          return <li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
