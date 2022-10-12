import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase"

const SignIn = () => {
    return (
        <button className='ms-auto btn btn-dark' onClick={signInWithGoogle} >Sign In</button>
    );
    
}

const SignOut = () => {
    return (
        <button className="ms-auto btn btn-dark" onClick={signOut}>Sign Out</button>
    );
}

const SignInOut = () => {
    
    return (
        useAuthState() === null ? <SignIn/> : <SignOut/>
    );
}

export default SignInOut;