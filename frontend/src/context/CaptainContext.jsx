import  React,{ createContext,useState,useContext } from "react";

export const CaptianDataContext = createContext();



const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captionData) => {
        setCaptain(captionData);
    };

    const value={
      captain,
      setCaptain,
      updateCaptain,
      isLoading,
      setIsLoading,
      error,
      setError
    }
  return (
    <CaptianDataContext.Provider value={value}>{children}</CaptianDataContext.Provider>
  )
}

export default CaptainContext
