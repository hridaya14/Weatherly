import { user, userAuthStatus } from "../atoms/index";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";


const Navbar = () => {
    const setUser = useSetRecoilState(user);
    const setAuth = useSetRecoilState(userAuthStatus);
    const navigate = useNavigate();
    const logout = () => {
        setUser("");
        setAuth(false);
        navigate("/login");
    }
    return (
      <div className="hidden nav h-[85vh] lg:flex lg:flex-col w-20 justify-between py-6 ">
        <ul className="flex flex-col gap-20 xl:gap-12 items-center">
            <li>
                <a href = "/"> <img src = "/menu/Logo.svg" className=""></img> </a>
            </li>
        </ul>
        <ul className="flex flex-col gap-20 xl:gap-12 items-center">
            <li>
                <a href = "/"> <img src = "/menu/home.png"></img> </a>
            </li>
            <li>
                <a href = "/" aria-hidden> <img src = "/menu/globe.png"></img> </a>
            </li>
            <li>
                <a href = "/" aria-hidden> <img src = "/menu/stats.png"></img> </a>
            </li>
        </ul>
        <ul className="flex flex-col gap-20 xl:gap-12 items-center">
            <li>
                <a href = "/"> <img src = "/menu/settings.png"></img> </a>
            </li>
            <li>
                <button onClick={logout}> <img src = "/menu/exit.png" className="w-8 h-8"></img> </button>
            </li>
        </ul>
      </div>
    );
  };
  
  export default Navbar;
  