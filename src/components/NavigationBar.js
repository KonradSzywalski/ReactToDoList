import React from 'react';
//Boostrap imports
import {Navbar} from 'react-bootstrap';

class NavigationBar extends React.Component{
    render(){
        return(
            <Navbar className="NavigationBar__NavigationBarComponent">
                <Navbar.Brand>
                    <img src="img/logo.svg" height="30" 
                    className="d-inline-block align-top" alt="Konrad Szywalski logo"/>
                </Navbar.Brand>
                <Navbar.Text className="ml-auto NavigationBar__NavTextComponent d-none d-sm-block">
                    <span className="NavigationBar__NavTextSpan">Frontend Assignment</span> - Konrad Szywalski
                </Navbar.Text>
            </Navbar>
     
        );
    }
}

export default NavigationBar;