import React from "react";
import GoolgleLogin from "../../../assets/Goolgle-login.png"
import CircleImg from "../../../assets/circles_bg.png"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../FireBase/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((res) => {
            if(res.user){
                navigate('/')
            }
        })
        
    }
    return(
        <>
            <div className="w-full h-full flex justify-center items-center text-left">
                <div className="flex flex-col text-left px-16">
                    <h1 className="text-left text-[26px] font-semibold text-[#7B1984]">TaskBuddy</h1>
                    <p className="text-left text-[12px] font-normal text-[#000000]">Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                    <img className="w-[50%]" src={GoolgleLogin} alt="GoolgleLogin" onClick={handleGoogleLogin} />
                </div>

                <div>
                    <img src={CircleImg} alt="CircleImg" />
                </div>
            </div>
        </>
    )
}

export default Login;