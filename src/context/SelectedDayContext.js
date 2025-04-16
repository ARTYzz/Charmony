// context/SelectedDayContext.js
import React, { createContext, useContext, useState } from "react";

const SelectedDayContext = createContext();

export function SelectedDayProvider({ children }) {
  const [selectedDay, setSelectedDay] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );

  return (
    <SelectedDayContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </SelectedDayContext.Provider>
  );
}

export function useSelectedDay() {
  const context = useContext(SelectedDayContext);
  if (!context) {
    throw new Error("useSelectedDay must be used within a SelectedDayProvider");
  }
  return context;
}
