import { useState, useRef, useEffect } from 'react';
import "./Dropdown.css";

//@ts-ignore
const DropdownItem:any = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren:boolean = item.children && item.children.length > 0;

  return (
    <li className={`dropdown-item ${hasChildren ? 'has-children' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span>{item.label}</span>
      {hasChildren && isOpen && (
        <ul className={`dropdown-submenu depth-${depth}`}>
          {item.children.map((child:any, index:any) => (
            <DropdownItem key={index} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

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
            <DropdownItem key={index} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;