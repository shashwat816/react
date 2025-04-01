import React from "react";
import ListItems from "./ListItems";

const RestuaurantFoodMenu = ({menuData, showItems, handleClick}) => {

  const { title, itemCards } = menuData;

  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-2xl p-4 rounded-xl">
      {/* {header} */}
      <div
        className="flex font-bold text-md justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span>
          {title} ({itemCards.length})
        </span>
        <span>⬇️</span>
      </div>
      <div>
        {/* {Accordion Body} */}
        {showItems && <ListItems itemData={itemCards} />}
      </div>
    </div>
  );
};

export default RestuaurantFoodMenu;
