import React, { useState } from "react";

const FlipCard: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div className="w-72 h-72 perspective-1000" onClick={handleClick}>
        <div
          className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute w-full h-full backface-hidden bg-gray-300 flex items-center justify-center">
            <img src="img_avatar.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute w-full h-full backface-hidden bg-blue-600 text-white flex flex-col items-center justify-center transform rotate-y-180">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default FlipCard;