import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to scroll to top when route changes
 * This ensures that when users navigate to a new page,
 * they always start at the top of the page
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Add smooth scrolling for better UX
    });
  }, [pathname]);
};

export default useScrollToTop;
