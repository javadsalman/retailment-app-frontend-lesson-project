import React from 'react';
import { FaQuestion } from 'react-icons/fa6';
import styles from './HelpCenterBadge.module.scss';

const HelpCenterBadge = () => {
  return (
    <div className={styles.badge}>
      <FaQuestion />
    </div>
  );
};

export default HelpCenterBadge;
