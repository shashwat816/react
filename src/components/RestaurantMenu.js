import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestuaurantFoodMenu from "./RestuaurantFoodMenu";
import { useState } from "react";
const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
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

  const { cards } = menuList?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR; // gives list of menu Cards for a restaurant
  const filteredMenuCards = cards.filter((item) => {
    return (
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  });

  return (
    <div className="text-center m-4">
      <h1 className="text-xl font-bold">{name}</h1>
      <h4 className="text-md font-bold">{cuisines}</h4>
      <h4 className="text-md font-bold">{avgRating}</h4>
      <h4 className="text-md font-bold">{costForTwoMessage}</h4>
      {filteredMenuCards.map((item, index) => (
        <RestuaurantFoodMenu
          key={item?.card?.card?.title}
          menuData={item.card.card}
          showItems={showIndex === index ? true : false}
          handleClick={() => {
            showIndex === index ? setShowIndex(null) : setShowIndex(index);
          }}
        />
      ))}
      ;
    </div>
  );
};

export default RestaurantMenu;
