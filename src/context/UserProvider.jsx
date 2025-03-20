/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

 const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      // Get the token from localStorage
      const token = localStorage.getItem("authToken");

      // If there's a token, we need to fetch the user details from the server
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}/api/auth/get-user-from-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            console.error("Failed to fetch user details:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
