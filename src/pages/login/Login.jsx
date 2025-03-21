import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
//Redux
import { useDispatch } from "react-redux";

//Silce
import { login } from "../../store/slice/authSlice";

//React router dom
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  // console.log("alguien ingreso al login");
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      user: user,
      password: password,
    };
    let response = await dispatch(login(body));
    // console.log(response);
    switch (response.payload.statusCode) {
      case 200:
        navigate("/home");
        break;
      default:
        setError("Usuario o contraseña incorrectos");
        break;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="flex bg-gray-300 justify-center items-center min-h-screen px-4 py-8"
      >
        <div className="bg-white rounded-xl shadow-md w-full max-w-md overflow-hidden">
          <div className="p-6 space-y-6">
            <h2 className="text-2xl text-center text-gray-800 font-bold">
              Iniciar sesión
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de Usuario */}
              <div>
                <label
                  htmlFor="username"
                  className="text-gray-700 text-sm block font-medium mb-2"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Nombre de usuario"
                  className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
                />
              </div>

              {/* Campo de Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="text-gray-700 text-sm block font-medium mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm font-semibold">
                  {error}
                </div>
              )}
              {/* Enlace de Recuperar Contraseña */}
              <div className="text-right">
                <a
                  href="/recuperar-contrasena" // Cambia esta ruta por la correcta
                  className="text-blue-600 text-sm hover:text-blue-800 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón de Iniciar Sesión */}
              <button
                type="submit"
                className="bg-blue-600 rounded-lg text-white w-full duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium hover:bg-blue-700 hover:scale-105 px-4 py-3 transform transition-all"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Login;
