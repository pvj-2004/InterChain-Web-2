import { useState } from "react";
import ExhibitionCard from "./ExhibitionCard";

export default function ExhibitionReviews() {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExhibition, setSelectedExhibition] = useState(null)
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    tickets: 1,
  })

  // Mock data for exhibition schedule
  const exhibitionSchedule = [
    { id: 1, title: "Art in Motion", date: "2024-01-15", time: "5:00 PM", location: "New York Art Hall" },
    { id: 2, title: "Modern Colors", date: "2024-02-10", time: "6:30 PM", location: "Los Angeles Gallery" },
    { id: 3, title: "Classical Vibes", date: "2024-03-05", time: "4:00 PM", location: "Chicago Museum" },
  ];

  const handleReviewSubmit = () => {
    if (review.trim()) {
      const newReview = {
        text: review,
        timestamp: new Date().toLocaleString(),
      };
      setReviews([...reviews, newReview]);
      setReview("");
    }
  };


  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const openModal = (exhibition) => {
    setSelectedExhibition(exhibition)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setUserDetails({ name: "", email: "", tickets: 1 })
  }

  const handleConfirmPurchase = () => {
    alert(` ${userDetails.tickets} Tickets purchased for ${selectedExhibition.title}!`);
    console.log("User Details:", userDetails);
    closeModal();
  };

  return (
    <>
      <div className="text-center text-3xl m-4">
        Exhibitions:
        <ExhibitionCard />
      </div>

      {/* Exhibition Schedule Section */}
      <div className="my-8 bg-purple-400 bg-opacity-25">
        <h2 className="text-3xl font-semibold mb-4 text-center">Upcoming Exhibition Schedule</h2>
        <ul className="space-y-4">
          {exhibitionSchedule.map((exhibition) => (
            <li
              key={exhibition.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-center">{exhibition.title}</h3>
              <p>
                <span className="font-bold">📅 Date:</span> {exhibition.date}
              </p>
              <p>
                <span className="font-bold">⏰ Time:</span> {exhibition.time}
              </p>
              <p>
                <span className="font-bold">📍 Location:</span> {exhibition.location}
              </p>
              <div className="mt-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                  onClick={() => alert(`RSVP for ${exhibition.title}`)}
                >
                  RSVP
                </button>
                <button
                  className="bg-transparent border  border-black border-solid  text-orange-500 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white"
                  onClick={() => openModal(exhibition)}
                >
                  Buy Tickets
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews Section */}
      <div className="my-4">
        <h2 className="text-xl font-bold">Leave a Review</h2>
        <textarea
          className="border  border-solid border-black rounded-md w-full p-2"
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          className={`mt-2 px-4 py-2 rounded-md text-white ${review.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          onClick={handleReviewSubmit}
          disabled={!review.trim()}
        >
          Submit
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-bold">User Reviews:</h3>
          {reviews.length > 0 ? (
            reviews.map((r, index) => (
              <div
                key={index}
                className="border-b py-2 flex justify-between items-center"
              >
                <div>
                  <p>{r.text}</p>
                  <p className="text-sm text-gray-500">{r.timestamp}</p>
                </div>
                <button
                  className="text-red-500 hover:underline mr-8"
                  onClick={() => handleDeleteReview(index)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>
      {/* Modal for Buying Tickets */}
      {isModalOpen && selectedExhibition && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-modal">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
            <h2 className="text-xl font-bold mb-4">
              Buy Tickets for {selectedExhibition.title}
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded-md w-full p-2 mb-4"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border rounded-md w-full p-2 mb-4"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <input
              type="number"
              min="1"
              placeholder="Number of Tickets"
              className="border rounded-md w-full p-2 mb-4"
              value={userDetails.tickets}
              onChange={(e) =>
                setUserDetails({ ...userDetails, tickets: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleConfirmPurchase}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
