class TaskModel {
    id: number;
    title: string;
    description: string;
    deadline: Date | null;

    constructor(id: number, title: string, description: string, deadline: Date | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline ? new Date(deadline) : null;
    }
}
export default TaskModel;