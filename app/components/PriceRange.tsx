import { PRICE_RANGE } from "@prisma/client";
import { ReactNode } from "react";

type PriceRangeProps = {
  priceRange: PRICE_RANGE;
};

const PriceRange = ({ priceRange }: PriceRangeProps) => {
  const renderPrice: Record<PRICE_RANGE, ReactNode> = {
    CHEAP: (
      <p className="flex mr-3">
        $<span className="text-gray-400">$$</span>
      </p>
    ),
    REGULAR: (
      <p className="flex mr-3">
        $$
        <span className="text-gray-400">$</span>
      </p>
    ),
    EXPENSIVE: <p className="flex mr-3">$$$</p>,
  };

  return <div>{renderPrice[priceRange]}</div>;
};

export default PriceRange;
