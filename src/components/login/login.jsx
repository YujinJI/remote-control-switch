import React, {useState} from 'react';
import styles from './login.module.css';
import {Link, useHistory} from "react-router-dom";

const Login = ({authService}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const goToConsole = () => {
    history.push({
      pathname: "./console"
    });
  };

  const onChangeHandler = (event) => {
    const type = event.target.name;
    if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "password") {
      setPassword(event.target.value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      await authService.signIn(email, password).then(goToConsole,
        reason => {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        });
    }
  };

  const onGoogleSignIn = async () => {
    await authService.signInWithGoogle().then(goToConsole,
      reason => {
        alert("구글 인증 정보가 올바르지 않습니다.");
      });
  };

  return(
    <section className={styles.login}>
      <ul className={styles.ul}>
        <li className={styles.img_wrap}>
          <img src="/images/light.png" className={styles.img} />
        </li>
        <li>
          <h1>로그인</h1>
        </li>
        <div className={styles.input_wrap}>
          <li>
            <p className={styles.p}>Email address</p>
            <input type="email" name="email" value={email} onChange={onChangeHandler} className={styles.input} placeholder="이메일을 입력하세요." />
          </li>
          <li>
            <p className={styles.p}>Password</p>
            <input type="password" name="password" value={password} onChange={onChangeHandler} className={styles.input} placeholder="비밀번호를 입력하세요." />
          </li>
          <li>
            <button type="submit" onClick={onSubmit} className={styles.button}>로그인</button>
          </li>
          <li>
            <p className={styles.p2}>소셜 계정으로 간편하게 로그인하기</p>
            <button onClick={onGoogleSignIn} className={styles.google}>
              <img src="/images/google.png" className={styles.icon} />
            </button>
          </li>
        </div>
        <li>
          <p className={styles.p}>아직 회원이 아니신가요?</p>
          <Link to="/signup" className={styles.link}><p>회원가입 하러가기 🚀</p></Link>
        </li>
      </ul>
    </section>
  );
}
export default Login;