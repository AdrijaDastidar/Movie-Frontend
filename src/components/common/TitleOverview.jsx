import React, { useState } from 'react';

function TitleOverview({ text, limit = 250, className }) {
  const [showComplete, setShowComplete] = useState(false);

  // Handle the case when the text is shorter than the limit
  const shouldTruncate = text.length > limit;
  const truncatedText = text.substring(0, limit - 50);

  return (
    <div className={className}>
      {shouldTruncate ? (
        <>
          {showComplete ? (
            <span>{text}</span>
          ) : (
            <span>{truncatedText}</span>
          )}
          <span
            className="text-gray-400 cursor-pointer"
            onClick={() => setShowComplete(!showComplete)}
          >
            {showComplete ? ' less' : ' ...more'}
          </span>
        </>
      ) : (
        <p className="inline">{text}</p>
      )}
    </div>
  );
}

export default TitleOverview;
