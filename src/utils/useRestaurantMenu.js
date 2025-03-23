import { useState, useEffect } from "react";
import { MENU_API_URL } from "./constant";


// custom hook
const useRestaurantMenu = (resId) => {
  const [menuList, setMenuList] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = MENU_API_URL + resId;
    const response = await fetch(url);
    const json = await response.json();
    setMenuList(json?.data);
  };
  return menuList;
};

export default useRestaurantMenu;
