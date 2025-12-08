module.exports = {
  testEnvironment: "jsdom", // needed for React components (DOM APIs)
  moduleFileExtensions: ["js", "jsx", "json"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    // makes imports like "../App.module.css" work in tests
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
