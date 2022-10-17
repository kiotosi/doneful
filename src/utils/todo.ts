import { TodoList } from "../types/todo.types";

/**
 * Get tutorial todo item list
 * @param t Function for translating text (i18n)
 * @returns Translated tutorial array
 */
export function generateTutorialTodo(t: any): TodoList {
  
  const textList: string[] = [];
  
  for (let i = 0; i < 5; i++) {
    textList.push(t(`tutorialTodo[${i}]`));
  }

  return textList.map((text, index) => {
    return {
      text,
      isDone: false,
      id: index
    };
  });
}