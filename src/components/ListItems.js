import React from "react";

const ListItems = ({ itemData }) => {
  return (
    <div>
      {itemData.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left"
        >
          <div className="py-2">
            <span>{item.card.info.name}</span>
            <span>
              - ₹
              {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
            </span>
          </div>
          <p className="text-xs">{item.card.info.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
