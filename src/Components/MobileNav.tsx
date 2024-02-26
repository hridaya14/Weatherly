const MobileNav = () => {
    const handlelogout = () => {};
    return (
        <nav className=" ">
            <ul className="mobile-nav text-2xl text-white font-[Inter]">
                <li className="active">
                    <a href = "/">
                        <span aria-hidden="true">Home</span>
                    </a>
                </li>
                <li className="active">
                    <a href = "/Map">
                        <span aria-hidden="true">Map</span>
                    </a>
                </li>
                <li className="active">
                    <a href = "/Settings">
                        <span aria-hidden="true">Settings</span>
                    </a>
                </li>
                <li className="active">
                    <button onClick={handlelogout}>
                        <span aria-hidden="true">Logout</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default MobileNav;