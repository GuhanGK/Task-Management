import React from "react";
import GoolgleLogin from "../../../assets/Goolgle-login.png"
import CircleImg from "../../../assets/circles_bg.png"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../FireBase/Firebase";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../../Redux/Auth";
import { useDispatch } from "react-redux";
import {ReactComponent as Logo} from '../../../assets/Logo.svg'
import TaskListImg from '../../../assets/Tasklistview.png'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((res) => {
            if (res.user) {
                // Dispatch the login state
                dispatch(setIsLoggedIn(true));
    
                // Open the desired URL in a new tab
                const newTab = window.open("/", "_blank");
                if (!newTab) {
                    console.error("Failed to open new tab. Popup might be blocked.");
                }
            }
        })
        .catch((error) => {
            console.error("Error during sign-in: ", error);
        });
        
    }
    return(
        <>
            <div className="w-full h-full flex justify-center items-center text-left">
                <div className="flex flex-col text-left px-16 gap-3">
                    <h1 className="text-left text-[26px] font-semibold text-[#7B1984] flex items-center"><Logo /> TaskBuddy</h1>
                    <p className="text-left text-[12px] font-mrdium text-[#000000]">Streamline your workflow and track progress effortlessly <br/> 
                    with our all-in-one task management app.</p>
                    <img className="w-[50%] mt-6" src={GoolgleLogin} alt="GoolgleLogin" onClick={handleGoogleLogin} />
                </div>

                <div>
                    <img src={CircleImg} alt="CircleImg" className="w-[100%] pointer-cursor" />
                    <img src={TaskListImg} alt="TaskListImg" className="absolute top-[80px] w-[45%] right-[30px]" />
                </div>
            </div>
        </>
    )
}

export default Login;
