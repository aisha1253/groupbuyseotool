"use client";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";

const Counter = ({ end, decimals }) => {
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  return (
    <span className="count" data-from="0" data-to={end} ref={countRef}>
      {isVisible ? (
        <CountUp
          end={end ? end : 100}
          duration={3}
          decimals={decimals ? decimals : 0}
        />
      ) : (
        "0"
      )}
    </span>
  );
};

export default Counter;
