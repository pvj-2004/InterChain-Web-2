import { useState } from "react";

export default function FAQs() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is the React Art Gallery?",
            answer: "A virtual space showcasing art created with React.",
        },
        {
            question: "Is there any cost to visit?",
            answer: "No, admission is completely free!",
        },
        {
            question: "Can I contribute my art?",
            answer: "Yes! Contact us for collaboration opportunities.",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-3xl text-center font-cormorant mb-5">
                Frequently Asked Questions
            </h2>
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="border-b py-3 cursor-pointer"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                    <h3 className="text-2xl font-bold flex justify-between items-center">
                        {faq.question}
                        <span>{openIndex === index ? "-" : "+"}</span>
                    </h3>
                    {openIndex === index && <p className="mt-2 text-gray-600 text-md">{faq.answer}</p>}
                </div>
            ))}
        </div>
    );
}
