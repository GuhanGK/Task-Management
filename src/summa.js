import { Switch } from "antd";
import React, { useState } from "react";

const PermissionManager = () => {
  const [enabledMenus, setEnabledMenus] = useState({
    Administrator: false,
    Tutor: false,
    Learner: false,
  });

  const [permissions, setPermissions] = useState({
    Administrator: [
      { name: "Dashboard", permissions: [false, false, false, false] },
      { name: "Course", permissions: [false, false, false, false] },
      { name: "Course List", permissions: [false, false, false, false] },
      { name: "People", permissions: [false, false, false, false] },
      { name: "Group", permissions: [false, false, false, false] },
    ],
    Tutor: [
      { name: "Schedule", permissions: [false, false, false, false] },
      { name: "Students", permissions: [false, false, false, false] },
      { name: "Assignments", permissions: [false, false, false, false] },
    ],
    Learner: [
      { name: "Profile", permissions: [false, false, false, false] },
      { name: "Courses", permissions: [false, false, false, false] },
      { name: "Progress", permissions: [false, false, false, false] },
    ],
  });

  const toggleMenu = (menu) => {
    setEnabledMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const togglePermission = (menu, itemIndex, permissionIndex) => {
    const updatedPermissions = { ...permissions };
    updatedPermissions[menu][itemIndex].permissions[permissionIndex] =
      !updatedPermissions[menu][itemIndex].permissions[permissionIndex];
    setPermissions(updatedPermissions);
  };

  return (
    <div className="permissions-container">
      <div className="menu-switches">
        {Object.keys(enabledMenus).map((menu) => (
          <div key={menu} className="menu-switch">
            <label>{menu}</label>
            <Switch
              type="checkbox"
              checked={enabledMenus[menu]}
              onChange={() => toggleMenu(menu)}
            />
          </div>
        ))}
      </div> 

      {/* Render Permissions Tables for Enabled Menus */}
      {Object.keys(enabledMenus).map(
        (menu) =>
          enabledMenus[menu] && (
            <div key={menu} className="permission-group">
              <div className="group-header">
                <span>{menu} Permissions</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Read</th>
                    <th>Write</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions[menu].map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.name}</td>
                      {item.permissions.map((permission, permissionIndex) => (
                        <td key={permissionIndex}>
                          {/* <input
                            type="checkbox"
                            checked={permission}
                            onChange={() =>
                              togglePermission(menu, itemIndex, permissionIndex)
                            }
                          /> */}
                          <Switch />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      )}
    </div>
  );
};

export default PermissionManager;
