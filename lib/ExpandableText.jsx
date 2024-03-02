import React, { useState } from "react";

const ExpandableText = ({ text, maxWords = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  // Split the text into an array of words
  const words = text.split(" ");

  // Slice the array based on the maxWords prop
  const truncatedText = words.slice(0, maxWords).join(" ");

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {expanded ? (
        <>
          {text}
          {text.length > maxWords && (
            <button
              onClick={handleToggle}
              className="text-sm ml-4"
              style={{ color: "#4FD1C5" }}
            >
              Show less
            </button>
          )}
        </>
      ) : (
        <>
          {truncatedText}
          {words.length > maxWords && (
            <button
              onClick={handleToggle}
              className="text-sm ml-4"
              style={{ color: "#4FD1C5" }}
            >
              ...Show more
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ExpandableText;
