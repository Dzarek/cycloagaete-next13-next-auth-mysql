import styled from "styled-components";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (res?.error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setUserInfo({ email: "", password: "" });
      }, 2000);
      return;
    }
    router.replace("/protected");
  };

  return (
    <Wrapper>
      <Link href="/">
        <button className="buttonLink logoutBtn">Wróć na stronę główną</button>
      </Link>
      <img src="/images/homepage/headerImg.png" alt="logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <h1>Logowanie</h1>
        {error && <p className="errorMsg">Nieprawidłowy login lub hasło!</p>}
        <input
          type="email"
          placeholder="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="hasło"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <button type="submit" className="buttonLink">
          Zaloguj się
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    width: 200px;
    margin-bottom: 5vh;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5vh 1vw;
    border: 2px solid #222;
    font-family: var(--titleFont);
    flex-wrap: wrap;
    background-color: white;
    border-radius: 20px;
    width: 50vw;
    h1 {
      margin-bottom: 3vh;
      font-size: 1.8rem;
      width: 100%;
      text-align: center;
      color: #222;
      text-transform: uppercase;
    }
    .errorMsg {
      font-weight: 500;
      color: darkred;
      font-family: var(--titleFont);
      width: 100%;
      text-align: center;
    }
    input {
      margin: 3vh auto;
      padding: 5px 10px;
      font-size: 1rem;
      font-family: var(--titleFont);
      width: 40%;
    }
    button {
      font-size: 1.2rem;
      width: 30%;
      text-align: center;
      margin-top: 2vh;
    }
  }
  .logoutBtn {
    position: absolute;
    top: 0;
    left: 2vw;
    font-size: 1rem;
    :hover {
      letter-spacing: 1px;
    }
  }
`;

export default SignIn;
