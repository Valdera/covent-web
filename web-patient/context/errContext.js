import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

export function ErrorContextProvider({ children }) {
  const [message, setMessage] = useState();
  return (
    <ErrorContext.Provider value={{ message, setMessage }}>
      {children}
    </ErrorContext.Provider>
  );
}
