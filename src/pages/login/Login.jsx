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
        console.log("Usuario o contraseña incorrectos");
        break;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="min-h-screen bg-gray-200 flex items-center justify-center py-8 px-4"
      >
        <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Iniciar sesión
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de Usuario */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Nombre de usuario"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Campo de Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Enlace de Recuperar Contraseña */}
              <div className="text-right">
                <a
                  href="/recuperar-contrasena" // Cambia esta ruta por la correcta
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón de Iniciar Sesión */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
