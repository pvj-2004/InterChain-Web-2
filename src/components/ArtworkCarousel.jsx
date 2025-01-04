// Import required modules
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';


// Carousel Imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Data Import
import { artworkDetails as initialArtworkDetails } from "../assets/data/artworkDetails";
import { useState, useEffect, useRef } from "react";
import Ratings from '../components/Ratings';

// Lightbox Component
function Lightbox({ artwork, onClose, onNext, onPrev }) {
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === "ArrowRight") {
      onNext();
    }
    if (e.key === "ArrowLeft") {
      onPrev();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ position: "relative", textAlign: "center" }}>
        <img
          src={artwork.imageSource}
          alt={artwork.Description}
          className="light-box-image"
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          }}
        />
        <p
          style={{
            color: "#fff",
            fontSize: "18px",
            marginTop: "15px",
            fontFamily: "Cormorant, serif",
            textAlign: "center"
          }}
        >
          {artwork.Name} <br />
          {artwork.Description}
        </p>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            background: "none",
            border: "none",
            fontSize: "30px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          style={{
            position: "absolute",
            top: "50%",
            left: "-50px",
            background: "none",
            border: "none",
            fontSize: "40px",
            color: "#fff",
            cursor: "pointer",
            transform: "translateY(-50%)",
          }}
        >
          &#10094; {/* Left Arrow */}
        </button>
        <button
          onClick={onNext}
          style={{
            position: "absolute",
            top: "50%",
            right: "-50px",
            background: "none",
            border: "none",
            fontSize: "40px",
            color: "#fff",
            cursor: "pointer",
            transform: "translateY(-50%)",
          }}
        >
          &#10095; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
}

export default function ArtworkCarousel() {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [artworkDetails, setArtworkDetails] = useState(initialArtworkDetails);
  const [newArtwork, setNewArtwork] = useState({
    imageSource: "",
    Name: "",
    Description: "",
  });
  const sliderRef = useRef(null)

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment(""); // Clear the textarea after submission
    }
  };

  useEffect(() => {
    const savedArtworks = localStorage.getItem("artworkDetails");
    if (savedArtworks) {
      setArtworkDetails(JSON.parse(savedArtworks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("artworkDetails", JSON.stringify(artworkDetails));
  }, [artworkDetails]);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewArtwork((prev) => ({ ...prev, imageSource: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArtworkSubmit = () => {
    if (newArtwork.Name && newArtwork.Description && newArtwork.imageSource) {
      const updatedArtworks = [...artworkDetails, newArtwork];
      setArtworkDetails(updatedArtworks);
      console.log("Base64 size (bytes):", newArtwork.imageSource.length * 2);
      localStorage.setItem("artworkDetails", JSON.stringify(updatedArtworks)); // Save to localStorage immediately

    }
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % artworkDetails.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      (prevIndex === 0 ? artworkDetails.length - 1 : prevIndex - 1)
    );
  };

  const handleImageClick = (clickedIndex) => {
    setIndex(clickedIndex); // Set the clicked index
    setLightboxOpen(true); // Open the lightbox
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (_, newIndex) => setIndex(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const artwork = artworkDetails[index];
  const shareUrls = {
    instagram: `https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(artwork.Name)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(artwork.Name)}`,
    pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(artwork.imageSource)}&description=${encodeURIComponent(artwork.Name)}`,
  };


  return (
    <section className="my-6 mx-4 sm:mx-48">
      <h2 className="text-5xl text-center my-4 font-cormorant">Our Artwork</h2>
      <Slider {...settings} ref={sliderRef}>
        {artworkDetails.map((artwork, artIndex) => (
          <img
            src={artwork.imageSource}
            alt={artwork.Description}
            key={artwork.Name}
            className={`cursor-pointer  p-2 hover:translate-y-[-30px] hover:scale-110  ${artIndex === index ? "active" : "inactive"
              }`}
            onClick={() => handleImageClick(artIndex)}
          />
        ))}
      </Slider>
      <Ratings artworkId={artworkDetails[index].Name} />
      <h1 className="text-3xl font-extrabold font-cormorant mt-4 text-center">{artworkDetails[index].Name}</h1>
      <p className="font-cormorant text-xl text-center mt-4 font-bold">{artworkDetails[index].Description}</p>
      <p className="text-center font-cormorant text-lg">
        {/* Social Media Sharing Buttons */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href={shareUrls.instagram} target="_blank" rel="noopener noreferrer" className="text-3xl text-pink-600 hover:text-pink-800">
            <FaInstagram />
          </a>
          <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-500 hover:text-blue-700">
            <FaTwitter />
          </a>
          <a href={shareUrls.pinterest} target="_blank" rel="noopener noreferrer" className="text-3xl text-red-600 hover:text-red-800">
            <FaPinterest />
          </a>
        </div>
        You can find More Artwork At the React Art Gallery!
      </p>

      {/* Active Indicator: Dots or Numbers */}
      <div className="flex justify-center space-x-3 mt-5">
        {initialArtworkDetails.map((_, i) => (
          <span
            key={i}
            className={`cursor-pointer w-3 h-3 rounded-full ${i === index ? "bg-blue-500" : "bg-gray-400"
              }`}
            onClick={() => {
              sliderRef.current.slickGoTo(i); // Navigate to slide
              setIndex(i); // Update index state
            }}
          />
        ))}
      </div>

      <div className="flex space-x-10 my-8 mx-0 gap-8">
        <div className="max-w-2xl mx-auto my-8 p-4 bg-stone-300 rounded-lg shadow-lg flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Your Art work</h2>
          <div className="space-y-4">
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={newArtwork.Name}
              onChange={(e) => setNewArtwork({ ...newArtwork, Name: e.target.value })}
              placeholder="Artwork Name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              value={newArtwork.Description}
              onChange={(e) => setNewArtwork({ ...newArtwork, Description: e.target.value })}
              placeholder="Artwork Description"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleArtworkSubmit}
              className="w-full py-2 px-4 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
            >
              Submit Artwork
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto my-8 p-3 bg-sky-800 rounded-lg shadow-lg flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave a Comment</h2>
          <div className="space-y-4">
            {/* Textarea for new comment */}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              onClick={handleCommentSubmit}
              className="w-[-30px] py-2 px-4  bg-neutral-200 text-orange-300 font-semibold rounded-lg hover:bg-neutral-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!newComment.trim()}
            >
              Submit Comment
            </button>
          </div>

          {/* Displaying the list of comments */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-3">Comments</h3>
            <div className="space-y-3">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm text-gray-800"
                  >
                    <p>{comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-white">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </div>


      {lightboxOpen && (
        <Lightbox
          artwork={artworkDetails[index]}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

    </section>
  );
}
