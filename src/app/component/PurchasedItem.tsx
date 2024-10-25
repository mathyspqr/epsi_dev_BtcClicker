import { ShopItemType } from "../page";

interface Props {
    item : ShopItemType; 
}

export const PurchasedItem = ({ item }: Props) => {

  return (
    <div className="p-5 rounded_lg bg-white flex flex-col justify-center items-center max-h-80 ">
    <img src={item.image_url} className="rounded-full border"></img>
    <p>Total : {item.total}</p>
    <p>{item.cps}/s</p>
</div>
  )}