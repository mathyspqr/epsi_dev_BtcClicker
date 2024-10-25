import Image from 'next/image';
import BTCImg from '@/assets/img/Bitcoin.png';

type OnCookieClick = () => void;

interface Props {
  totalCookies: number;
  cookiesPerSecond?: number;
  onCookieClick: OnCookieClick;
  cps: number;
}

export const CookieZone = ({ totalCookies, onCookieClick, cps = 0 }: Props) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className='text-2xl font-bold'>BTC par secondes {cps}</p>
      <p className='text-3xl font-bold'>Total BTC : {totalCookies.toFixed(0)}</p>
      <Image 
        onClick={onCookieClick} 
        src={BTCImg} 
        alt="BTC Image" 
        className="cursor-pointer h-52 hover:h-60 w-52 hover:w-64 ease-in-out duration-300" 
      />
    </div>
  );
};
