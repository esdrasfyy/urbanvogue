import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import {RatingViewProps} from "@/components/ui/rating/rating-view/types/index"
function RatingView({ rating }: RatingViewProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = Array(5)
    .fill(0)
    .map((_, index) => {
      if (index < fullStars) {
        return <FaStar key={index} />;
      } else if (hasHalfStar && index === fullStars) {
        return <FaStarHalfAlt key={index} />;
      } else {
        return <FaRegStar key={index} />;
      }
    });

  return <div className="flex text-custom-pink">{stars}</div>;
}

export {RatingView};
