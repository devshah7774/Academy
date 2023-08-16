import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const strings = ['hello', 'world'];
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isErasing, setIsErasing] = useState(false);

  const typingDelay = 100; // Adjust this value to control typing speed
  const eraseDelay = 50;   // Adjust this value to control erasing speed
  const pauseBetweenStrings = 2000; // 2 seconds

  useEffect(() => {
    const handleTyping = () => {
      const currentString = strings[currentStringIndex];
      const currentLength = currentText.length;

      if (!isErasing) {
        if (currentLength < currentString.length) {
          setCurrentText(currentString.substring(0, currentLength + 1));
        } else {
          setIsErasing(true);
          setTimeout(() => {
            setCurrentStringIndex((prevIndex) => prevIndex + 1);
          }, pauseBetweenStrings);
        }
      } else {
        if (currentLength > 0) {
          setCurrentText(currentString.substring(0, currentLength - 1));
        } else {
          setTimeout(() => {
            setIsErasing(false);
          }, pauseBetweenStrings);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, isErasing ? eraseDelay : typingDelay);

    return () => clearInterval(typingInterval);
  }, [currentText, currentStringIndex, isErasing]);

  return (
    <div>
      <h1>{currentText}</h1>
    </div>
  );
};

export default TypingEffect;
