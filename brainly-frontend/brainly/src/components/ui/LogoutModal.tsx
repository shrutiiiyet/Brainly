import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { CrossIcon } from "../../icons/CrossIcon";

export const LogoutModal = ({open, onClose }: {
    open:boolean, 
    onClose: () => void
}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    };

    return (
        <>
        {open && <>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Logout</h2>
                    <p className="mb-4">Are you sure you want to logout?</p>
                    <div className="flex justify-end space-x-2">
                        <Button variant="secondary" text="Cancel" onClick={onClose} />
                        <Button variant="primary" text="Logout" onClick={handleLogout} />
                    </div>
                </div>
            </div>
        </>}
        </>
    );
}