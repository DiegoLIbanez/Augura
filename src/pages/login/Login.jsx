import React,{ useState } from 'react';

//Redux
import { useDispatch } from "react-redux";

//Silce
import { login } from "../../store/slice/authSlice";

//React router dom
import { useNavigate } from "react-router-dom";

function Login() {

  // let token = sessionStorage.getItem('token');
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      user:user,
      password:password
    };
   let response = await dispatch(login(body));  
  //  console.log(response);   
   switch (response.payload.statusCode) {
    case 200:
      navigate("/home");
      break;    
    default:
      console.log("Usuario o contraseña incorrectos");    
      break;
   }
  };

  // useEffect(() => {
  //   if(token){
  //     console.log('token:',token);
  //   }
  // }, [token]);

  return (
    <>
      <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button onClick={handleSubmit}>iniciar sesion</button>
      </div>
    </>
  );
}

export default Login;
