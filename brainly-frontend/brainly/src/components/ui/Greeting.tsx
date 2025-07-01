import { PlusIcon } from "../../icons/PlusIcon"
import { Button } from "./Button"

export const Greeting = (props: any) => {
    return <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-grey-800">Welcome to Brainly!</h1>
                <p className="text-grey-600 mb-2">
                Get started by adding your first content.
                </p>
                <p className="text-grey-600 mb-6">
                This dashboard helps you manage and organize everything in one place.
                </p>
                <Button text="Add Content" variant="primary" startIcon=<PlusIcon/> onClick={()=>{props.setModalOpen(true)}}/>
            </div>
        </div>
    </>
}