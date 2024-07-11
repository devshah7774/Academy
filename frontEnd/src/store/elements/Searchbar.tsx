import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // const [response, setResponse] = useState('');
  const searchBoxRef:any = useRef(null);
  const containerRef:any = useRef(null);

  useEffect(() => {
    if (isOpen) {
      searchBoxRef.current.focus();
    }
  }, [isOpen]);

  const toggleState = (open:any) => {
    setIsOpen(open);
    if (containerRef.current) {
      containerRef.current.style.width = open ? '300px' : '60px';
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    toggleState(!isOpen);
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      toggleState(false);
    }
  };

  const handleBlur = () => {
    toggleState(false);
  };

  return (
    <div className="container">
      <div className="search-box-container" ref={containerRef}>
        <button className="submit" onMouseDown={handleSubmit}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          className="search-box"
          ref={searchBoxRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default SearchBar;