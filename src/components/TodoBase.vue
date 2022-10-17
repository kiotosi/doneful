<template>
  <div
    ref="todoManagerRef"
    class="todo-manager"
  >
    <TransitionGroup
      tag="ul"
      name="todo-items"
    >
      <TodoItem
        v-for="itemInfo in sortedTodoList"
        :key="itemInfo.id"
        class="todo-manager__item"
        :item-info="itemInfo"
        @change="changeItem"
        @remove="removeItem(itemInfo.id)"
        @check="checkItem(itemInfo.id)"
        @activate-edit="() => isEditing = true"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TodoList } from '../types/todo.types';
import { generateTutorialTodo } from '../utils/todo';
import localStorageUtil from '../utils/localStorage';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: "TodoBase",
  components: { TodoItem },
  data() {
    return {
      todoList: [] as TodoList,
      lastItemId: 0,
      isEditing: false
    };
  },
  computed: {
    sortedTodoList(): TodoList {

      // TODO: Tutorial order is messed. Check algorithm.
      const sortedList = [...this.todoList].sort(a => a.isDone ? 0 : -1);
      return sortedList;
    },
  },
  beforeMount() {
    // Getting todo list from local storage
    const localStorageTodo = localStorageUtil.todo.parseTodoList();
    if (!localStorageTodo) {
      this.init();
      return;
    }
    this.todoList = localStorageTodo;
    // Getting last id for a todo item from local storage
    this.lastItemId = localStorageUtil.todo.parseLastId();
  },
  mounted() {
    addEventListener('keydown', this.onKeyDown);
  },
  unmounted() {
    removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    /**
     * Init tutorial items in todo manger
     */
    init() {
      this.todoList = generateTutorialTodo(this.$t);
      this.lastItemId = this.todoList.length - 1;
      this.saveList();
    },
    /**
     * Save all todo items to LocalStorage
     */
    saveList() {
      localStorageUtil.todo.patchLastId(this.lastItemId);
      localStorageUtil.todo.patchTodoList(this.todoList);
    },
    /**
     * Clear all todo items
     */
    clearAll(): void {
      this.todoList = [];
      this.lastItemId = 0;
      this.saveList();
    },
    /**
     * Add item to list
     */
    addItem(): void {
      this.lastItemId++;
      this.todoList.push({ text: "New item", isDone: false, id: this.lastItemId });
      this.saveList();
    },
    /**
     * \Remove item from list
     */
    removeItem(id: number): void {
      this.todoList = this.todoList.filter(todoItem => todoItem.id !== id);
      this.saveList();
    },
    /**
     * Change text in todo item
     */
    changeItem(id: number, text: string): void {
      this.isEditing = false;
      const todoItem = this.todoList.find(todoItem => todoItem.id === id);
      if (!todoItem) {
        console.error("Trying to change element, that doesn't exists");
        return;
      }
      todoItem.text = text;
      this.saveList();
    },
    /**
     * Mark item as complete
     */
    checkItem(id: number): void {
      const todoItem = this.todoList.find(todoItem => todoItem.id === id);
      if (!todoItem) {
        console.error("Trying to check element, that doesn't exists");
        return;
      }
      todoItem.isDone = !todoItem.isDone;
      this.saveList();
    },

    onKeyDown(e: KeyboardEvent): void {
      
      if (this.isEditing) {
        return;
      }
      
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        this.addItem();
      }
    }
  },
});
</script>

<style scoped lang="scss">
.todo-manager {
  @include popupUI;
  overflow-y: auto;

  &__item + &__item {
    margin-top: var(--space-sm);
  }
}

.todo-items-move,
.todo-items-enter-active,
.todo-items-leave-active {
  transition: all 0.5s ease;
}
.todo-items-enter-from,
.todo-items-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.todo-items-leave-active {
  position: absolute;
}
</style>