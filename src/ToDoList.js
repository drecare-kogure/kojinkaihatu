import React from "react";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            dueDate: "",
            notes: ""
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // ToDoリストにタスクを追加する処理を書く
        console.log("Submitted:", this.state);
        // フォームの内容をリセットする
        this.setState({
            taskName: "",
            dueDate: "",
            notes: ""
        });
    };

    render() {
        return (
            <div className="alert alert-primary">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>内容:</label>
                        <input
                            type="text"
                            name="taskName"
                            value={this.state.taskName}
                            onChange={this.handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>期日・予定日:</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={this.state.dueDate}
                            onChange={this.handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>備考:</label>
                        <textarea
                            name="notes"
                            value={this.state.notes}
                            onChange={this.handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
            </div>
        );
    }
}

export default ToDoList;
