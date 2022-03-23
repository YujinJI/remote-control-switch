import React from 'react';
import styles from './header.module.css';
import {Link} from "react-router-dom";

const Header = ({logout}) => {

  return(
    <section className={`${logout ? styles.header : styles.header_main}`}>
      <div className={styles.wrap}>
        <div className={styles.logo}>
          <div className={styles.logoImg}>
            <img src="/images/light.png" className={styles.img}/>
          </div>
          <p>Switch</p>
        </div>
        {logout ?
          <button onClick={logout} className={styles.button}>로그아웃</button> :
          <div className={styles.links}>
            <Link to="/login" className={styles.link}>Sign in</Link>
            <Link to="/signup" className={styles.link}>Sign up</Link>
          </div>
        }
      </div>
    </section>
  );
}

export default Header;