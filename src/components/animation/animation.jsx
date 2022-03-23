import React from 'react';
import styles from './animation.module.css';
import Info from "../info/info";

const Animation = () => {
  return(
    <div className={styles.main}>
      <div className={styles.wrap}>
        <section className={styles.animation}>
          <div className={styles.sky}>
            <img src="/images/sun.png" className={styles.sun}/>
            <img src="/images/cloud1.png" className={styles.cloud1}/>
            <img src="/images/cloud2.png" className={styles.cloud2}/>
          </div>
          <div className={styles.town}>
            <img src="/images/circle.png" className={styles.circle}/>
            <img src="/images/town_night.png" className={styles.night}/>
            <img src="/images/town_day.png" className={styles.day}/>
          </div>
          <div className={styles.people}>
            <img src="/images/man.png" className={styles.man}/>
            <img src="/images/family.png" className={styles.family}/>
          </div>
        </section>
      </div>
      <section className={styles.info}>
        <Info />
      </section>
    </div>
  );
}

export default Animation;