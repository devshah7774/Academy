import { useState, useRef, useEffect } from 'react';
import "./Dropdown.css";

//@ts-ignore
const Dropdown:any = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef:any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={dropdownRef}
    >
      <div className="dropdown-toggle">
        {title}
        <div><i className="arrow"></i></div>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item:any, index:any) => (
            <li key={index} onClick={() => console.log(`Clicked: ${item}`)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;