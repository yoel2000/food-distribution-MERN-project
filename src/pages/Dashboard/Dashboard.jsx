import React from "react"

function Dashboard(props) {

    console.log(props.location.state)
    return(
        <div>
            Hello,
            {props.location.state.map((d, index) => (
        <p> {d.name} must deliver to: {d.address}!</p>
    ))}

        </div>
    )
}

export default Dashboard