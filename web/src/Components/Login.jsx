import React from "react";

function Login() {
  // 1. We will create an initial object
  const initData = {
    email: "",
    password: "",
  };
  // 2. Kje gi zacuvame podatocite sto ke gi ispratime na nasata
  const [data, setData] = useState(initData);

  // 3. Kje kreirame stejt koj kje proveruva dali sme logirani ili ne
  const [loggedIn, setLoggedIn] = useState(false);
  // 4. So ovaa funkcija ke gi sledime promenite vo formata
  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // 5. Imame funkcija login koja normalno e asihrona
  const login = async () => {
    try {
      let res = await fetch("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      });
      let out = await res.json();
      if (res.ok) {
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <div>Login</div>;
}

export default Login;
