import React from "react"
import { useState } from "react"
import { useEffect } from "react"


function HomeWorker() {

    let getName = () => {
        let user = JSON.parse(sessionStorage.getItem('cur_user'));
        let name = "";
        if (user) {
            if (user.local)
                name = user.local.firstname + user.local.lastname;
            else if (user.google)
                name = user.google.name;
            else if (user.facebook)
                name = user.facebook.name;
        }
        return name;
    }
    return(
        <h1>Welcome  {getName()}</h1>
    )
}

export default HomeWorker