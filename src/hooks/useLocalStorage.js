import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  function updateValue(newValue) {
    setValue((previousValue) => {
      const nextValue =
        typeof newValue === "function"
          ? newValue(previousValue)
          : newValue;

      try {
        localStorage.setItem(key, JSON.stringify(nextValue));
      } catch (error) {
        console.error("LocalStorage error:", error);
      }

      return nextValue;
    });
  }

  return [value, updateValue];
}

export default useLocalStorage;