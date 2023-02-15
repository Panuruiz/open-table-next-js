import { ReactNode } from "react";

type PriceRangeProps = {
  priceRange: string;
};

const PriceRange = ({ priceRange }: PriceRangeProps) => {
  const renderPrice: Record<string, ReactNode> = {
    CHEAP: (
      <p className="flex mr-3">
        $<span className="text-gray-400/25">$$</span>
      </p>
    ),
    REGULAR: (
      <p className="flex mr-3">
        $$
        <span className="text-gray-400/25">$</span>
      </p>
    ),
    EXPENSIVE: <p className="flex mr-3">$$$</p>,
  };

  return <div>{renderPrice[priceRange]}</div>;
};

export default PriceRange;
