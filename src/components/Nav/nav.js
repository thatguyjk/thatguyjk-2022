import React from "react";
import { Link } from "gatsby"

const Nav = () => {

    return (
        <nav>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
        </nav>
    );
}

export default Nav;