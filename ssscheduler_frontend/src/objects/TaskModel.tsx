class TaskModel{
    id: number;
    title: string;
    description: string;
    deadline: Date;

    constructor(id: number, title: string, description: string, deadline: Date){
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
    }
}
export default TaskModel;