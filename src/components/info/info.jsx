import React from 'react';
import styles from './info.module.css';

const Info = (props) => {
  return(
    <section className={styles.info}>
      <h1 className={styles.h1}>Remote Control Switch</h1>
      <h2 className={styles.h2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus dolor, fringilla ac magna id, iaculis pellentesque magna. Phasellus congue, nisi nec pharetra egestas, metus ligula cursus diam, a maximus quam diam ut est. Integer ultrices nisl justo, quis porta sem rhoncus sed.
      </h2>
    </section>
  );
}

export default Info;