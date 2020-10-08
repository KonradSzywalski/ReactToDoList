import React from 'react';
//FontAwesome cimports
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

class ToDoRow extends React.Component{

    state = { 
        showTrashState: false,
        checked: "false"
    }
         
    showTrashIcon = () => {
        this.setState({
            showTrashState: !this.state.showTrashState
          })
    }

    handleMarkCheckbox = (e) =>{
        const {id} = e.target;
        const {checked} = e.target;
        this.props.onEdit(id,  checked, this.props.todo);
     
    }

    render(){
        const {todo, onDelete, endRowValue, startRowValue} = this.props;
        const showTrash = this.state.showTrashState ? 'ToDoRow__TrashWrapper' : 'ToDoRow__TrashWrapper--display_none';
        return(

            todo.slice(startRowValue,endRowValue).map((item, index)=>{   
                    return [     
                        <tr className="ToDoRow__UpSpacer" key={index+startRowValue+1}> 
                            <td className="ToDoRow__UpSpacerElement"></td>
                            <td className="ToDoRow__UpSpacerElement"></td>
                            <td className="ToDoRow__UpSpacerElement"></td>
                        </tr>, 
                        <tr className="ToDoRow__DataRow" key={index+startRowValue} onMouseEnter={this.showTrashIcon} onMouseLeave={this.showTrashIcon}>
                            <td>
                                {item.task}                        
                            </td>
                            <td>
                                {item.priority === "1" ? "Low" : ""}
                                {item.priority === "2" ? "Medium" : ""}
                                {item.priority === "3" ? "Hard" : ""}  
                            </td>
                            <td>
                                <div className="ToDoRow__ToolsWrapper">
                                    <div className="ToDoRow__CheckboxWrapper">
                                        <input type="checkbox" className="ToDoRow__CheckBoxInput" id={index+startRowValue} name="checked" checked={item.checked} onChange={this.handleMarkCheckbox}/>
                                        <label htmlFor={index+startRowValue}></label>
                                    </div>      
                                    <div className={showTrash}>                                       
                                        <FontAwesomeIcon className="ToDoRow__TrashIcon" icon={faTrash} onClick= {() => {onDelete(index+startRowValue); index+startRowValue===todo.length-1 ? this.showTrashIcon() : void 0}}/>
                                    </div>  
                                    
                                </div>    
                            </td>
                            </tr>,
                            <tr className="ToDoRow__DownSpacer" key={index+startRowValue+2}> 
                                <td className="ToDoRow__DownSpacerElement"></td>
                                <td className="ToDoRow__DownSpacerElement"></td>
                                <td className="ToDoRow__DownSpacerElement"></td>
                            </tr>        
                    ]                                             
            })
        
        );
    }
}

export default ToDoRow;