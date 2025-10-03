
// import React, { createContext, useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (user) return;

//     const accessToken = localStorage.getItem("token");
//     if (!accessToken) {
//       setLoading(false);
//       return;
//     }
//     const fetchUser = async () => {
//       try {
//         const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
//         setUser(response.data);
//       } catch (error) {
//         console.error("User not authenticated :", error);
//         clearUser();
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//     // eslint-disable-next-line
//   }, []);

//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("token", userData.token);
//     setLoading(false);
//   };

//   return (
//     <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;




// import axios from 'axios'; (originally there but removed )
import React, {createContext,useEffect,useState} from 'react';
import axiosInstance from "../utils/axiosInstance";//added
import { API_PATHS } from "../utils/apiPaths";//added

// export const UserContext = createContext({
//   user: null,
//   loading: true,
//   updateUser: () => {},
//   clearUser: () => {},
// });
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

const UserProvider=({children})=>{
    const [user,setUser]= useState(null); 
    const [loading,setLoading]= useState(true);
    useEffect(()=>{
      if (user) return;

      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        setLoading(false);
        return;
      }
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
          setUser(response.data);
        } catch (error) {
          console.error("User not authenticated :", error);
          clearUser();
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
      // eslint-disable-next-line
    }, []);
    const updateUser=(userData)=>{
        setUser(userData)
        localStorage.setItem('token',userData.token)
        setLoading(false)
    }
    const clearUser=()=>{
        setUser(null);
        localStorage.removeItem('token')
        setLoading(false);
    }

    return(
        <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
            {children}
        </UserContext.Provider>
    )
}
        

export default UserProvider;


