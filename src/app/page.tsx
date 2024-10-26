"use client";
import { useEffect, useState } from "react";
import { CookieZone } from "./component/CookieZone";
import { ShopItem } from "./component/ShopItem";
import { PurchasedItem } from "./component/PurchasedItem";
import { Navbar } from "./component/Navbar";

export interface ShopItemType {
  id: number;
  image_url: string;
  label: string;
  price: number;
  cps: number;
  total: number;
}

const defaultShopItems: ShopItemType[] = [
  {
    id: 1,
    label: "Carte Graphique bas gamme",
    image_url:
      "https://asset.msi.com/resize/image/global/product/product_7_20180411113751_5acd830f900d9.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
    price: 10,
    cps: 1,
    total: 0,
  },
  {
    id: 2,
    label: "Carte Graphique moyens gamme",
    image_url:
      "https://static.gigabyte.com/StaticFile/Image/Global/3e584025b97909df1d32a313e04c4692/Product/23124/png/500",
    price: 100,
    cps: 10,
    total: 0,
  },
  {
    id: 3,
    label: "Carte Graphique moyens gamme AMD",
    image_url:
      "https://static.gigabyte.com/StaticFile/Image/Global/55495f423ee7ece1c4806d438d73998c/Product/29987/Png",
    price: 500,
    cps: 50,
    total: 0,
  },
];

export default function Home() {
  const [cookies, setCookies] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState(defaultShopItems);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);

  const handlePurchasedItem = (item: ShopItemType) => {
    setCookies(cookies - item.price);

    const actualItems = [...purchasedItems];

    const itemIndex = actualItems.findIndex((o) => o.id == item.id);

    actualItems[itemIndex].total++;

    setPurchasedItems([...actualItems]);
    console.log("items ici", actualItems);

    setCookiesPerSecond(cookiesPerSecond + item.cps);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => prevCookies + cookiesPerSecond / 100);
    }, 10);

    return () => clearInterval(interval);
  }, [cookiesPerSecond]);

  return (
    <div>
    <Navbar></Navbar>
    <div className="h-screen w-screen flex">
      <div className="left w-1/4">
        <CookieZone
          totalCookies={cookies}
          cookiesPerSecond={10}
          cps={cookiesPerSecond}
          onCookieClick={() => {
            setCookies(cookies + 1);
          }}
        />
      </div>

      <div className="center flex-1 grid grid-cols-4 gap-3 p-5 auto-rows-fr">
        {purchasedItems.filter(o => o.total > 0).map(item => <PurchasedItem item={item} key={item.id}></PurchasedItem>)}
      </div>
      <div className="right w-1/4 flex flex-col gap-3">
        {purchasedItems.map((item) => (
          <ShopItem
            item={item}
            totalCookies={cookies}
            key={item.id}
            onClick={() => {
              handlePurchasedItem(item);
            }}
          />
        ))}
      </div>
    </div>
    </div>
  );
}
