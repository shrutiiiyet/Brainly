import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/ModalInput";
import { BACKEND_URL } from "../config";
import { useRef } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
        })
        const jwt = response.data.token;
        alert(jwt);

        localStorage.setItem("token", jwt);
        navigate('/dashboard');
    }

    return <>
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 flex flex-col p-8">
                <p className="font-bold font-stretch-50%"> Sign in to Brainly!</p>
                <Input reference={usernameRef} placeholder="Enter username"></Input>
                <Input reference={passwordRef} placeholder="Enter password"></Input>

                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signin" onClick={signin} fullWidth={true}/>
                </div>
            </div>
        </div>
    </>
}