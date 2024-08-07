

export const checkVaildData = (Email,Password)=>{
    const email =  /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(Email);
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(Password);
    if (!email) return "Email is not vaild";
    if(!password) return "Password is not vaild"

    return null;
}