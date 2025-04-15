import React from "react";

const icons = ["twitter", "apple", "instagram", "youtube", "pinterest"];

const SocialIcons = () => {
  return (
    <ul className="socialIcon">
      {icons.map((icon) => (
        <li key={icon}>
          <a href="#" className="socialLink">
            <span className={`bi-${icon}`}></span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialIcons;
