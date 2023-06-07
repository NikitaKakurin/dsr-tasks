import React from 'react';
import 'components/UI/BasketIcon/basketIcon.scss';
interface IProps {
  count: number;
  alt: string;
  src: string;
}
export default function BasketIcon({ count, alt, src }: IProps) {
  return (
    <div className="basketIcon__container">
      <div className="basketIcon__count">{count}</div>
      <img src={src} alt={alt} className="basketIcon__img" />
    </div>
  );
}
