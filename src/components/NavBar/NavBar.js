import React, {useRef} from 'react';
import useNavigation from '../../hooks/useNavigation';
import {gql,useQuery} from '@apollo/client'
import Error from './../Error';
import Loader from './../Loader';
import TopMenu from './../TopMenu';
import SideMenu from './../SideMenu';
import './style.scss'


const GET_ROCKETS_NAMES = gql`
    {
        rockets(offset: 1){
            id
            name
        }
    }
`
const NavBar = () => {
    const navRef = useRef(null)
    const {isMobileView, isMenuOpen, setIsMenuOpen} = useNavigation(navRef)
    // * how do we get the data, loading and error from?
    const {data,loading,error} = useQuery(GET_ROCKETS_NAMES)

    if(error) return <Error error={error}/>
    if(loading) return <Loader/>
    
    return(
        <div className='container-fluid' ref = {navRef}>
            <div className='row'>
                <TopMenu
                    isMenuOpen={isMenuOpen}
                    isMobileView={isMobileView}
                    toggleMenu={setIsMenuOpen}
                    rockets={data.rockets}
                />

                <SideMenu
                    isMenuOpen={isMenuOpen}
                    isMobileView={isMobileView}
                    toggleMenu={setIsMenuOpen}
                    rockets={data.rockets}
                />


            </div>

        </div>
            

    ) ;
};

export default NavBar;
