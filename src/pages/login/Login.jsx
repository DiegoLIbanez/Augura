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
    //console.log(response);   
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
      <div className='mt-20'>
        <form>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Iniciar sesión
                </p>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Usuario
                  </label>
                  <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Nombre de usuario" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Contraseña
                  </label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" />
                </div>

                <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                  Iniciar sesión
                </button>            
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
