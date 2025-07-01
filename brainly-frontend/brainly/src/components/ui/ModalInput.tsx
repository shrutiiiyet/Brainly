export function Input({placeholder, reference} : {reference?: any, placeholder:string}) {
    return <>
        <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2" ref={reference}></input>
        </>
}