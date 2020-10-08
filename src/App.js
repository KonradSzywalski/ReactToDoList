import React from 'react';
//Own imports
import ToDoTable from './components/ToDoTable';
import NavigationBar from './components/NavigationBar';
//Boostrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

class App extends React.Component{
  render(){
    return(
        <div className="root">
          <NavigationBar/>
          <Container>
            <ToDoTable/>
          </Container>
        </div>
    );
  }
}
export default App;
