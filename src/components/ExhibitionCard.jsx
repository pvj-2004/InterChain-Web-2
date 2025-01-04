import React from "react";

const exhibitions = [
    {
        name: "Art Expo",
        description: "A celebration of modern art and creativity.",
        date: "Jan 15, 2025",
    },
    {
        name: "Gallery Showcase",
        description: "Featuring works from top local artists.",
        date: "Feb 10, 2025 ",
    },
];

export default function ExhibitionCard() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 mx-48">
            {exhibitions.map((exhibition, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow bg-orange-500 text-blue-100"
                >
                    <h2 className="text-2xl font-bold">{exhibition.name}</h2>
                    <p className="text-sky-100">{exhibition.description}</p>
                    <p className="text-sky-1000 italic">{exhibition.date}</p>
                </div>
            ))}
        </section>
    );
}