import { useAuthDispatch } from "../state-hooks";
import { logout } from "../../global-state-context/authSlice";
import {useRouter} from "next/navigation";
import { queryClient } from "../../Services/API/ApiInstance";

const useLogout = () => {
    const dispatch = useAuthDispatch(); // ✅ Call inside another hook
    const router = useRouter();

    return () => {
      queryClient.invalidateQueries();
      queryClient.clear();

      dispatch(logout());
      router.push("/");
    };
};

export default useLogout;