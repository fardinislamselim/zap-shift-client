import React from "react";
import {
  FaTruck,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const howItWorksData = [
  {
    title: "Booking Pick & Drop",
    description:
      "Easily schedule a pickup and drop-off for your personal or business shipments, hassle-free.",
    icon: <FaTruck className="text-3xl text-primary" />,
  },
  {
    title: "Cash On Delivery",
    description:
      "Offer your customers the convenience of paying upon delivery, making transactions safer and simpler.",
    icon: <FaMoneyBillWave className="text-3xl text-primary" />,
  },
  {
    title: "Delivery Hub",
    description:
      "Track your packages at our centralized hubs to ensure fast and efficient delivery.",
    icon: <FaWarehouse className="text-3xl text-primary" />,
  },
  {
    title: "SME & Corporate Booking",
    description:
      "Tailored logistics solutions for small businesses and corporate clients to streamline their shipping needs.",
    icon: <FaBuilding className="text-3xl text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="">
      <div className="">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {howItWorksData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
