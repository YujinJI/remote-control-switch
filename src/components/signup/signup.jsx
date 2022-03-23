import React, {useState} from 'react';
import styles from './signup.module.css';
import {Link, useHistory} from "react-router-dom";

const Signup = ({authService}) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const goToLogin = () => {
    alert("회원가입에 성공하였습니다!");
    history.push({
      pathname: "./"
    });
  };

  const onChangeHandler = (event) => {
    const type = event.target.name;
    if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "password") {
      setPassword(event.target.value);
    } else if (type === "passwordCheck") {
      setPasswordCheck(event.target.value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" || password !== "" || passwordCheck !== "") {
      if (password === passwordCheck) {
        await authService.signUp(email, password).then(goToLogin,
          reason => {
            alert("회원가입에 실패하였습니다! 다시 시도하세요!");
            setPassword("");
            setPasswordCheck("");
          });
      } else {
        alert("비밀번호를 동일하게 입력해 주세요!");
        setPassword("");
        setPasswordCheck("");
      }
    } else {
      alert("이 버튼을 그냥 누른 당신... 왜일까..?");
    }
  };

  const onGoogleSignIn = async () => {
    await authService.signInWithGoogle().then(goToLogin,
      reason => {
        alert("구글 인증에 실패하였습니다.");
      });
  };

  return(
    <section className={styles.signup}>
      <ul className={styles.ul}>
        <li className={styles.img_wrap}>
          <img src="/images/light.png" className={styles.img} />
        </li>
        <li>
          <h1>회원가입</h1>
        </li>
        <div className={styles.input_wrap}>
          <li>
            <p className={styles.p}>Email address</p>
            <input type="email" name="email" value={email} onChange={onChangeHandler} className={styles.input} placeholder="아이디를 입력하세요." />
          </li>
          <li>
            <p className={styles.p}>Password</p>
            <input type="password" name="password" value={password} onChange={onChangeHandler} className={styles.input} placeholder="비밀번호를 입력하세요." />
          </li>
          <li>
            <p className={styles.p}>Password</p>
            <input type="password" name="passwordCheck" value={passwordCheck} onChange={onChangeHandler} className={styles.input} placeholder="비밀번호를 다시 입력하세요." />
          </li>
          <li>
            <button type="submit" onClick={onSubmit} className={styles.button}>회원가입</button>
          </li>
          <li>
            <p className={styles.p2}>소셜 계정으로 간편하게 로그인하기</p>
            <button onClick={onGoogleSignIn} className={styles.google}>
              <img src="/images/google.png" className={styles.icon} />
            </button>
          </li>
        </div>
        <li>
          <p className={styles.p}>이미 회원이신가요?</p>
          <Link to="/login" className={styles.link}><p>로그인 하러가기 🚀</p></Link>
        </li>
      </ul>
    </section>
  );
}

export default Signup;