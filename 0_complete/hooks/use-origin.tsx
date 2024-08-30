import { useEffect, useState } from 'react';

// Custom hook to get the window's origin
export const useOrigin = () => {
  const [mounted, setMounted] = useState(false); // State to track if component is mounted

  // Get the window's origin if available, otherwise return an empty string
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  useEffect(() => {
    setMounted(true); // Set mounted to true when the component mounts
  }, []);

  if (!mounted) return null; // Return null if the component isn't mounted
  return origin; // Return the origin if mounted
};

// // safely accessing the window object in nextJs13 little bit complicated

// import { useEffect, useState } from 'react';

// // because most server side rendering frameworks don't have a window object and nextJs is one of them so we need to check if the window object is available or not before accessing it

// export const useOrigin = () => {
//   const [mounted, setMounted] = useState(false);

//   const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

//   // For avoiding hydration mismatch error in nextJs we are using useEffect hook to set the mounted state to true after the component is mounted

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;
//   return origin;
// };
