import { ShopItemType } from "../page";

interface Props {
    item: ShopItemType,
    onClick: () => void,
    totalCookies: number
}

export const ShopItem = ({ item, onClick, totalCookies, ...props }: Props) => {

    const checkClick = () => {
        if (totalCookies >= item.price) {
            onClick();
        } else {
            alert(`Pas assez de cookies pour la carte graphique ${item.label} et son prix ${item.price} BTC`);
        }
    }    

    return (
        <div
            className="w-full p-2 border rounded-lg bg-slate-100 hover:bg-slate-300 ease-in-out duration-300 cursor-pointer"
            {...props}
            onClick={checkClick}
        >
            <img
                src={item.image_url}
                alt={item.label} 
                className="w-40 h-40 object-cover mx-auto"
            />
            <div className="flex flex-col p-2">
                <h1>Quantité : {item.total} CG</h1>
                <h1>Coût : {item.price} BTC</h1>
            </div>
        </div>
    );
};
