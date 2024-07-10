import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [response, setResponse] = useState('');
  const [responseOpacity, setResponseOpacity] = useState(0);
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
      containerRef.current.style.width = open ? '300px' : '50px';
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    toggleState(!isOpen);
    if (!isOpen) {
      handleRequest();
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      toggleState(false);
      handleRequest();
    }
  };

  const handleBlur = () => {
    toggleState(false);
  };

  const handleRequest = () => {
    if (searchValue.length > 0) {
      setResponse(`Searching for "${searchValue}" . . .`);
      setResponseOpacity(1);
      setSearchValue('');
      setTimeout(() => {
        setResponseOpacity(0);
      }, 2300);
    }
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
      <h3 className="response" style={{ opacity: responseOpacity }}>
        {response}
      </h3>
    </div>
  );
}

export default SearchBar;