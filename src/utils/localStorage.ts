import { localStorageNames } from "../data/localStorage.define";
import { TodoList } from "../types/todo.types";

export default {
  todo: {
    
    /**
     * Parse todo list from local storage
     * @returns Todo list or null
     */
    parseTodoList(): TodoList | null {
      const localStorageList = localStorage.getItem(localStorageNames.todoList);

      if (!localStorageList) {
        return null;
      }

      const parsedData: TodoList = JSON.parse(localStorageList);
      return parsedData ?? null;
    },

    /**
     * Patch local storage with new todoList
     * @param todo Todo list
     */
    patchTodoList(todo: TodoList): void {
      localStorage.setItem(localStorageNames.todoList, JSON.stringify(todo));
    },

    /**
     * Returns last id of created todo item
     * @returns Last id of todo list
     */
    parseLastId(): number {
      const localStorageTodoId = localStorage.getItem(localStorageNames.lastTodoId);
      return localStorageTodoId ? +localStorageTodoId : 0;
    },
    
    /**
     * Save last id of created todo item in local storage
     * @param n Current last todo item id
     */
    patchLastId(n: number): void {
      if (isNaN(n)) {
        console.error('Current last todo item id is NaN!');
        n = this.parseLastId();
        n++;
      }

      localStorage.setItem(localStorageNames.lastTodoId, n.toString());
    }
  }
};