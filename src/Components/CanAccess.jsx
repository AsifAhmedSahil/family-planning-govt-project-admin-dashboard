/* eslint-disable react/prop-types */
import React from "react";
import { useUser } from "../context/UserProvider";

export const CanAccess = ({ type = "read", route, children, renderMode = "hide" }) => {
    // const user = JSON.parse(localStorage.getItem("userToken"));
    const {user} = useUser()
    const privilegeMap = {
      create: user?.create_privilege,
      read: user?.read_privilege,
      edit: user?.edit_privilege,
      update: user?.edit_privilege,
      delete: user?.delete_privilege,
    };
  
    const rawPrivileges = privilegeMap[type] || "";
    const privileges = rawPrivileges.split(",").map((p) => p.trim());
  
    const hasAccess = privileges.includes(route);
  
    if (hasAccess) return children;
  
    if (renderMode === "disable" && React.isValidElement(children)) {
      return React.cloneElement(children, {
        disabled: true,
        style: {
          ...children.props.style,
          backgroundColor: "#ccc",
          cursor: "not-allowed",
        },
      });
    }
  
    return null;
  };
  