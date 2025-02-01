import React from "react";
import "./FeatureSection.css";
import { FaShippingFast, FaRegClock, FaPiggyBank, FaPercent, FaHandshake, FaHeadset } from "react-icons/fa";

const features = [
  { 
    icon: <FaShippingFast className="feature-icon" />, 
    text: "Free Shipping",
    color: "#fdddef"
  },
  { 
    icon: <FaRegClock className="feature-icon" />, 
    text: "Online Order",
    color: "#cdebbc"
  },
  { 
    icon: <FaPiggyBank className="feature-icon" />, 
    text: "Save Money",
    color: "#d1e8f2"
  },
  { 
    icon: <FaPercent className="feature-icon" />, 
    text: "Promotion",
    color: "#cdd4f8"
  },
  { 
    icon: <FaHandshake className="feature-icon" />, 
    text: "Happy Sell",
    color: "#f6dbf6"
  },
  { 
    icon: <FaHeadset className="feature-icon" />, 
    text: "24/7 Support",
    color: "#fff2e5"
  },
];

const FeatureSection = () => {
  return (
    <section id="feature" className="section-p1">
      {features.map((feature, index) => (
        <div className="fe-box" key={index}>
          <div className="icon-wrapper" style={{ backgroundColor: feature.color }}>
            {feature.icon}
          </div>
          <h6>{feature.text}</h6>
        </div>
      ))}
    </section>
  );
};

export default FeatureSection;