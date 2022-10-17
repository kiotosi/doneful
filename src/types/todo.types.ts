import { localStorageNames } from "../data/localStorage.define";

export type TodoLocalStorageName = keyof typeof localStorageNames;

export interface TodoItem {
  text: string
  isDone: boolean
  id: number
}

export type TodoList = TodoItem[];