import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "../../store/slice/authSlice";
import { getProfileService } from "../../store/services/authService";

const AuthProvider =  ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUserSession = async () => { 
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && token !== "undefined" && user && user !== "undefined") {

        try {
          const responseProfile = await getProfileService(token, user);

          dispatch(restoreSession({
            token:token,
            user:user,
            _id:responseProfile.data.data[0]._id,
            statusCode:responseProfile.data.statusCode,
            email:responseProfile.data.data[0].email,
            role:responseProfile.data.data[0].role.description,
            status:responseProfile.data.data[0].status.description
          }));
        } catch (error) {
          console.error("Error al restaurar la sesión:", error);
          // Aquí podrías manejar la expiración del token si es necesario
        }

      }
    }

    restoreUserSession();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
