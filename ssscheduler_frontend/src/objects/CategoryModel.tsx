import TaskModel from "./TaskModel";

class CategoryModel{
    id: number;
    name: string;
    taskList: Array<TaskModel> = [];

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}
export default CategoryModel;