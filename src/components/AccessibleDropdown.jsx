import React, { useState, useRef, useEffect } from "react";
import styles from "./AccessibleDropdown.module.css"; // <-- IMPORT NEW STYLES

function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when pressing 'Escape' or clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current.focus(); // Return focus to the button
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      {/* 1. The main button/trigger */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dropdownButton}
        id="dropdown-button" // Used to link the menu to the button
        aria-expanded={isOpen} // ARIA: Indicates if the controlled element is visible
        aria-haspopup="true" // ARIA: Indicates a popup element (like a menu) will appear
      >
        Select an Option {isOpen ? "▲" : "▼"}
      </button>

      {/* 2. The custom menu/list container */}
      {isOpen && (
        <ul
          role="menu" // ARIA: Defines the element as a container of menu items
          aria-labelledby="dropdown-button" // ARIA: Links the menu to its label/trigger
          className={styles.menuList}
        >
          {/* 3. The menu items */}
          <li role="presentation">
            {/* tabIndex={0} makes the link keyboard focusable inside the menu */}
            <a
              href="#"
              role="menuitem"
              tabIndex={0}
              className={styles.menuItemLink}
            >
              Option 1 (Tech)
            </a>
          </li>
          <li role="presentation">
            <a
              href="#"
              role="menuitem"
              tabIndex={0}
              className={styles.menuItemLink}
            >
              Option 2 (Finance)
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AccessibleDropdown;
