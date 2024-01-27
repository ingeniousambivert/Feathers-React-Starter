/* eslint-disable react/prop-types */

import { NavLink } from "./index";

const Sidenav = ({ items }) => {
  return (
    <nav className="text-sm font-medium text-gray-500 px-2">
      <ul>
        {items.map((item, index) => (
          <li key={item.key ? item.key : index} className="mb-1.5">
            {item.link ? (
              <NavLink
                to={item.link}
                className={({ isActive }) => [isActive ? "text-black" : "hover:underline"].join(" ")}
              >
                {item.label}
              </NavLink>
            ) : (
              item.label
            )}

            {item.children && (
              <ul className="ml-4 text-xs">
                {item.children.map((child, index) => (
                  <li key={child.key ? child.key : index} className="my-1.5">
                    {child.link ? (
                      <NavLink
                        to={child.link}
                        className={({ isActive }) => [isActive ? "text-black" : "hover:underline"].join(" ")}
                      >
                        {child.label}
                      </NavLink>
                    ) : (
                      child.label
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Sidenav };
