import React from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


interface NavigationProps{
    logoutFunction: () => void;
}

const NavBar: FC<NavigationProps> = ({logoutFunction}) => {
    const navigate = useNavigate();
    return(
        <nav>
            <div className="navContainer">
                <label content="navBar or smth"></label>
            </div>
        </nav>
    )
}
export default NavBar