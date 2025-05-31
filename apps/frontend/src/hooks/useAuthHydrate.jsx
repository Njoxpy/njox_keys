import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

const useAuthHydrate = () => {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      login({ email, role: null }, token);
    }
  }, [login]);
};

export default useAuthHydrate;
