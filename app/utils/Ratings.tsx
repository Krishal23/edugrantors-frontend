// components/Ratings.tsx
import React from 'react';

type RatingsProps = {
    rating: number; // Rating value (e.g., from 1 to 5)
};

const Ratings: React.FC<RatingsProps> = ({ rating }) => {
    // Limit the rating to a maximum of 5
    const maxRating = 5;
    const filledStars = Math.round(rating);
    const emptyStars = maxRating - filledStars;

    return (
        <div className="flex">
            {[...Array(filledStars)].map((_, index) => (
                <span key={index} className="text-yellow-400">★</span> // Filled star
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={index} className="text-gray-300">★</span> // Empty star
            ))}
        </div>
    );
};

export default Ratings;
