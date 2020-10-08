import React from 'react';
//Own imports
import ToDoRow from './ToDoRow';
import AddTaskForm from './AddTaskForm';
//Boostrap imports
import {Table} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
//FontAwesome imports
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort} from '@fortawesome/free-solid-svg-icons'
import {faSortUp} from '@fortawesome/free-solid-svg-icons'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'

class ToDoTable extends React.Component{

    state = {
            data:[],
            order: "asc",
            startRowValue: 0,
            endRowValue: 5,
            rowValue: 5
        } 
        
    componentDidUpdate = () => {
        localStorage.setItem('toDoDataStore', JSON.stringify(this.state.data));
    }

    componentDidMount = () => {
        const toDoDataStore = JSON.parse(localStorage.getItem('toDoDataStore'));
        if(toDoDataStore !== null){
            this.setState({data: toDoDataStore})
        }
    }

    handleSubmit = (newVal) =>{
        this.setState({data: [...this.state.data, newVal]})
        this.sortByTaskNameMarker = <FontAwesomeIcon icon={faSort}/>;
        this.sortByPriorityMarker = <FontAwesomeIcon icon={faSort}/>;

        let newRowValue = this.state.rowValue;

        this.setState({
             startRowValue: 0,
             endRowValue: newRowValue,
             showButtonPrevious: false,
             showButtonNext: true
        })
        alert("A new task has been added.");
    }

    handleRemove = index =>{
       const {data} = this.state;
       this.setState({
           data: data.filter((item, i)=>{
               return i !== index;
           })
       })

       let newRowValue = this.state.rowValue;

       this.setState({
            startRowValue: 0,
            endRowValue: newRowValue,
            showButtonPrevious: false,
            showButtonNext: true
       })
       alert("The task has been deleted.")
    }

    handleEdit = (id, checked) =>{
        const {data} = this.state;
        id = parseInt(id, 10);
        if(checked === false){
            data.forEach((item, i) =>{
                if(i === id){
                    item.checked = false
                   
                }
            })
        }else{
            data.forEach((item, i) =>{
                if(i === id){
                    item.checked = true
                }
            })  
        }
            
        this.setState({data: data})
    }

    toggleSortByTaskName = () => {
        if(this.state.order==="asc"){
            let sortedByTaskName = this.state.data.sort((a, b) => a.task > b.task ? 1 : -1);
            this.setState({
                data: sortedByTaskName,
                order: "desc"
                }
            )
            this.sortByTaskNameMarker = <FontAwesomeIcon icon={faSortUp}/>;
        }
        else{
            let sortedByTaskName = this.state.data.sort((a, b) => a.task < b.task ? 1 : -1);
            this.setState({
                data: sortedByTaskName,
                order: "asc"
                }
            )
            this.sortByTaskNameMarker = <FontAwesomeIcon icon={faSortDown}/>;
        }
        this.sortByPriorityMarker = <FontAwesomeIcon icon={faSort}/>;
        this.sortByDoneMarker = <FontAwesomeIcon icon={faSort}/>;
      }

    toggleSortByPriority = () =>{
        if(this.state.order==="asc"){
            let sortedByPriority = this.state.data.sort((a, b) => a.priority > b.priority ? 1 : -1);
            this.setState({
                data: sortedByPriority,
                order: "desc"
                }
            )
            this.sortByPriorityMarker = <FontAwesomeIcon icon={faSortUp}/>;    
        }
        else{
            let sortedByPriority = this.state.data.sort((a, b) => a.priority < b.priority ? 1 : -1);
            this.setState({
                data: sortedByPriority,
                order: "asc"
                }
            )
            this.sortByPriorityMarker = <FontAwesomeIcon icon={faSortDown}/>;
            
        }
        this.sortByTaskNameMarker = <FontAwesomeIcon icon={faSort}/>;
        this.sortByDoneNameMarker = <FontAwesomeIcon icon={faSort}/>;
      }

    toggleSortByDone = () => {
        if(this.state.order==="asc"){
            let sortedByDone = this.state.data.sort((a, b) => a.checked > b.checked ? 1 : -1);
            this.setState({
                data: sortedByDone,
                order: "desc"
                }
            )
            this.sortByDoneMarker = <FontAwesomeIcon icon={faSortUp}/>;
        }
        else{
            let sortedByDone = this.state.data.sort((a, b) => a.checked < b.checked ? 1 : -1);
            this.setState({
                data: sortedByDone,
                order: "asc"
                }
            )
            this.sortByDoneMarker = <FontAwesomeIcon icon={faSortDown}/>;
        }
        this.sortByPriorityMarker = <FontAwesomeIcon icon={faSort}/>;
        this.sortByTaskNameMarker = <FontAwesomeIcon icon={faSort}/>;
      }

    handleSelectRowPages = (e) =>{
        const {name, value} = e.target;
        const valueInt = parseInt(value, 10);
        this.setState({
            [name]: valueInt,
            startRowValue: 0,
            endRowValue: valueInt,
            rowValue: valueInt
        })
    }

    handlePreviousPageButton = (e) =>{
        let currtentStartRowValue = this.state.startRowValue;
        let currtentEndRowValue = this.state.endRowValue;
        let curretRowValue = this.state.rowValue;

        let newStartRowValue = currtentStartRowValue - curretRowValue;
        let newEndRowValue = currtentEndRowValue - curretRowValue;

        let currentDataLength = this.state.data.length;

        let tempEndRowValue = currentDataLength + curretRowValue;  
        let restModuloDataLength = currentDataLength % curretRowValue 
        
        let newDataLength = 0;
        if(restModuloDataLength===0){
            newDataLength = curretRowValue ; 
        }
        else{
            newDataLength = tempEndRowValue - restModuloDataLength; 
        }

        if(currtentStartRowValue===0){
            this.setState({
                startRowValue: newDataLength-curretRowValue,
                endRowValue: newDataLength
            })
        }
        else{
            this.setState({
                startRowValue: newStartRowValue,
                endRowValue: newEndRowValue
            })
        }
        
    }

    
    handleNextPageButton = (e) =>{
        let currtentStartRowValue = this.state.startRowValue;
        let currtentEndRowValue = this.state.endRowValue;
        let curretRowValue = this.state.rowValue;

        let newStartRowValue = currtentStartRowValue + curretRowValue;
        let newEndRowValue = currtentEndRowValue + curretRowValue;
        

        if(currtentEndRowValue>=this.state.data.length){
            this.setState({
                startRowValue: 0,
                endRowValue: curretRowValue
            })
        }
        else{
            this.setState({
                startRowValue: newStartRowValue,
                endRowValue: newEndRowValue
            })
        }
    }

    render(){
        const {data} = this.state;
        const {endRowValue, startRowValue} = this.state;
        let sortByTaskNameMarker = this.sortByTaskNameMarker;
        let sortByPriorityMarker = this.sortByPriorityMarker;
        let sortByDoneMarker = this.sortByDoneMarker;

        return(
            <div>
            <Table responsive className="ToDoTable__TableComponent">
                <thead>
                    <tr>
                        <th className="ToDoTable__TableHeaderElement" onClick={this.toggleSortByTaskName}>Task name <span className="ToDoTable__TableHeaderSpan">{sortByTaskNameMarker ? sortByTaskNameMarker : <FontAwesomeIcon icon={faSort}/>}</span></th>
                        <th className="ToDoTable__TableHeaderElement" onClick={this.toggleSortByPriority}>Priority <span className="ToDoTable__TableHeaderSpan">{sortByPriorityMarker ? sortByPriorityMarker : <FontAwesomeIcon icon={faSort}/>}</span></th>
                        <th className="ToDoTable__TableHeaderElement" onClick={this.toggleSortByDone}>Done <span className="ToDoTable__TableHeaderSpan">{sortByDoneMarker ? sortByDoneMarker : <FontAwesomeIcon icon={faSort}/>}</span></th>
                    </tr>
                </thead>
                <tbody>
                    {data.length!==0 ? <ToDoRow todo={data} endRowValue={endRowValue} startRowValue={startRowValue} onEdit={this.handleEdit} onDelete={this.handleRemove}/> : <tr><td className="ToDoTable__NoDataToDisplay" colSpan="3">There are no tasks to display.</td></tr>}
                </tbody>    
                <tfoot>
                    <AddTaskForm onClick={this.handleSubmit}/>
                    <tr>
                        <td colSpan="3">
                                <div className="ToDoTable__PaginationWrapper">
                                    <span className="ToDoTable__SelectRowsPerPagesSpan">Rows per page:</span>
                                    <div className='ToDoTable__SelectRowsPerPagesWrapper'>
                                        <Form.Control className="ToDoTable__SelectRowsPerPages" as="select" value={this.state.rowValue} name="endRowValue" id="selectRowsPerPage" onChange={this.handleSelectRowPages}>
                                            <option className="ToDoTable__SelectRowsPerPagesOption">5</option>
                                            <option className="ToDoTable__SelectRowsPerPagesOption">10</option>
                                            <option className="ToDoTable__SelectRowsPerPagesOption">15</option>
                                        </Form.Control>
                                    </div>
                                    <div className="ToDoTable__PageInformationWrapper">
                                    <span className="ToDoTable__PageInformationSpan">{this.state.startRowValue+1} - {this.state.endRowValue < this.state.data.length ? this.state.endRowValue : this.state.data.length} of {data.length}</span>
                                    </div>
                                    <div className='ToDoTable__PreviousPageButtonWrapper'>
                                        <FontAwesomeIcon className="ToDoTable__PreviousPageButton" onClick={this.handleNextPageButton} icon={faAngleLeft}/> 
                                    </div>
                                    <div className='ToDoTable__NextPageButtonWrapper'>
                                        <FontAwesomeIcon className="ToDoTable__NextPageButton" onClick={this.handleNextPageButton} icon={faAngleRight}/>  
                                    </div>  
                                </div>
                        </td>
                    </tr>
                </tfoot>  
            </Table>
            </div>
        );
    }
}

export default ToDoTable;