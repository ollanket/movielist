// import type { NextPage } from "next";

// const Signup: NextPage = () => {
//   return (
//     <div>
//       <span>Helloworld</span>
//     </div>
//   );
// };

// export default Signup;

import { useState } from "react";
import Router from "next/router";

function Signup() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function handleSubmit(event: any) {
    event.preventDefault();
    setUserData({ ...userData, error: "" });

    const username = userData.email;
    const password = userData.password;

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error);
      }

      console.log(json);
      Router.push("/");
    } catch (error) {
      console.error(error);
      const { message } = error as Error;
      setUserData({ ...userData, error: message });
    }
  }

  return (
    <>
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={(event) =>
              setUserData(
                Object.assign({}, userData, { email: event.target.value })
              )
            }
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={(event) =>
              setUserData(
                Object.assign({}, userData, { password: event.target.value })
              )
            }
          />

          <button type="submit">Sign up</button>

          {userData.error && <p className="error">Error: {userData.error}</p>}
        </form>
      </div>
      <style jsx>{`
        .signup {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form {
          display: flex;
          flex-flow: column;
        }
        label {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      `}</style>
    </>
  );
}

export default Signup;
