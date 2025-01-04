import React from "react";
import FAQs from "./FAQs";
export default function About({ darkMode }) {
  return (
    <section className={`px-5 h-4/5 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-green-200 text-black"
      }`}>
      <h1 className="text-5xl font-cormorant text-center my-5 text-opacity-60">About Us</h1>
      <p className="text-center font-cormorant text-2xl my-2 p-3">
        Founded with a passion for promoting creativity and fostering artistic
        connections, React Art Gallery is a virtual art gallery committed to
        showcasing exceptional talent. <br /> Our mission is to provide a
        platform for artists to share their stories and for art enthusiasts to
        experience the transformative power of visual expression.
      </p>

      <p className="text-center font-cormorant text-2xl mt-2 mb-4">
        Plan your visit to the React Art Gallery and witness the dynamic fusion
        of art and technology. Whether you&rsquo;re a seasoned art enthusiast or
        a curious newcomer, our gallery offers a welcoming space to explore,
        appreciate, and connect with the ever-evolving world of React art.
        <br />
        <br />
        <span className="font-bold text-2xl">
          Gallery Hours:
          <br />
        </span>
        Monday to Friday: 10 AM - 6 PM <br />
        Saturday and Sunday: 12 PM - 5 PM <br />
        Admission is free, and creativity knows no bounds at the React Art
        Gallery. We look forward to sharing the magic of React-based art with
        you.
      </p>
      <p className="text-center font-cormorant text-xl my-6">
        Have questions, comments, or collaboration inquiries? Reach out to
        us—we&apos;d love to hear from you!
      </p>
      <FAQs />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mt-8">
        <div className={`p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-black"
          }`}>
          <a
            href="https://github.com/shreyas-078"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=GitHub&logoColor=white"
              alt="GitHub Badge"
              className="mx-auto"
            />
          </a>
          <p className="text-center mt-2">GitHub Repo for this Project</p>
        </div>

        <div className={`p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-black"
          }`}>
          <a
            href="https://www.linkedin.com/in/shreyas-salankimatt-83588a260/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white"
              alt="LinkedIn Badge"
              className="mx-auto"
            />
          </a>
          <p className="text-center mt-2">Aasim Khan’s LinkedIn</p>
        </div>

        <div className={`p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-black"
          }`}>
          <a
            href="https://twitter.com/shreyas_078"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/badge/Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white"
              alt="Twitter Badge"
              className="mx-auto"
            />
          </a>
          <p className="text-center mt-2">Aasim Khan’s Twitter Profile</p>
        </div>
      </div>
    </section>
  );
}