import React from 'react';
import styles from './Footer.module.scss';

const icons = ['twitter', 'apple', 'instagram', 'youtube', 'pinterest'];

const SocialIcons = () => {
  return (
      <ul className={styles.socialIcon}>
        {icons.map((icon) => (
          <li key={icon}>
            <a href="#" className={styles.socialLink}>
              <span className={`bi-${icon}`}></span>
            </a>
          </li>
        ))}
      </ul>
  );
};

export default SocialIcons;
