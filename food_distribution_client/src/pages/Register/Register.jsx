import React from 'react'

function Register() {
    return(
        <div>
       <form>
        <input type="text"  placeholder="firstname:"/> <br/>
        <input type="text" placeholder="lastname:"/> <br/>
        <input type="text" placeholder="email:"/> <br/>
        <input type="text" placeholder="password:"/> <br/>
        <input type="text" placeholder="confirm your password:"/> <br/>
        <input type="button" value="Register now" /> <br/>
       </form>
       <p1>You can also register with: </p1> <br/>
       <a href="http://localhost:8080/auth/google">Google</a> <br/>
       <button>Facebook</button>
       </div>
    );
}

export default Register
