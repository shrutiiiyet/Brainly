import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/ModalInput";
import { BACKEND_URL } from '../config'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
        })
        alert(response.data.message);
        navigate('/signin');
    }

    return <>
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 flex flex-col p-8">
                <Input reference={usernameRef} placeholder="Enter username"></Input>
                <Input reference={passwordRef} placeholder="Enter password"></Input>
 
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signup" onClick={signup} fullWidth={true}/>
                </div>
            </div>
        </div>
    </>
}