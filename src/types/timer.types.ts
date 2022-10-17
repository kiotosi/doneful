export enum TIMER_MODE {
  WORK_MODE,
  REST_MODE
}

export interface TimerStoreStates {
  workTime: number,
  restTime: number,
  isBigBreakActive: boolean,
  breakAfterSessions: number,
  bigBreakTime: number
  currentMode: TIMER_MODE
}