import { useState } from "react";

// Rating Component
function Ratings({ artworkId }) {
    const [rating, setRating] = useState(0);

    const handleRating = (rate) => {
        setRating(rate); // Update the rating
        // Save to the backend or state (if needed)
    };

    return (
        <div className="flex justify-center items-center space-x-1 mb-5 text-xl p-4">
            {[1, 2, 3, 4, 5].map((rate) => (
                <span
                    key={rate}
                    className={`cursor-pointer ${rate <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => handleRating(rate)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default Ratings;