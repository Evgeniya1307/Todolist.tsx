import { Button } from "./Button";



type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Task[];
};

export const Todolist = ({ title, tasks }: PropsType) => {
  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div className="input-group">
        <input type="text" placeholder="Add new task" />
        <Button title={'+'} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} readOnly />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="buttons">
      <Button title={'All'} />
        <Button title={'Active'} />
        <Button title={'Completed'} />
      </div>
    </div>
  );
};

