import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { CaptianDataContext } from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const { caption, setCaptain } = useContext(CaptianDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

 
  useEffect(() => {
    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/caption/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setCaptain(response.data.caption);
          setisLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        localStorage.removeItem("token");
        navigate("/caption-login");
      } 
    };

    if (token) {
      fetchCaptainProfile();
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
