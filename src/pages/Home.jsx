import React from "react";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import LogoutButton from "../components/Auth/Logout";
const Home = () => {
    const user = useSelector(state => state.user);
    return (
        <div>
            <div style={{width:'100%', display: 'flex', justifyContent: 'end'}}>
             <LogoutButton />
            </div>
            <div style={{ flex: 1, margin: '0 1rem' }}>
                <Search />
            </div>

           
        </div>

    )
}

export default Home;