import React from 'react';
//Boostrap imports
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

class AddTaskForm extends React.Component{

    formValues = {
        task: '',
        priority: '1',
        checked: false
    }
    
    state = this.formValues;


    handleValidation = () =>{
        let validation = true;

        if(this.state.task==="")
        {   
            alert("Task name field is required.")
            validation = false;
        }
       
        return validation;
    }

    handleInput = (e) =>{  
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSelect = (e) =>{
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleOnClick = (e) =>{
    if(this.handleValidation()===true)
        {
            e.preventDefault();
            this.props.onClick(this.state);
            this.setState(this.formValues);
        }
    }

    render(){
        const {task} = this.state;
        const {priority} = this.state;

        return(
            <tr>
                <td>
                    <Form.Control className="AddTaskForm__AddTask" type="text" placeholder="Task name" name="task" id="task" value={task} onChange={this.handleInput}/>
                </td>
                <td>
                    <Form.Control className="AddTaskForm__SelectList" as="select" name="priority" id="priority" value={priority} onChange={this.handleSelect}>
                        <option className="AddTaskForm__SelectListOption" value="1">Low</option>
                        <option className="AddTaskForm__SelectListOption" value="2">Medium</option>
                        <option className="AddTaskForm__SelectListOption" value="3">Hard</option>
                    </Form.Control>
                </td>
                <td>
                    <Button className="AddTaskForm__AddButton" type="submit" onClick={this.handleOnClick}>Add</Button>
                </td>
            </tr>  
         
        );
    }
}

export default AddTaskForm;