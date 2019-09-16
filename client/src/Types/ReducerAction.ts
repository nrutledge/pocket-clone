export default interface ReducerAction<T> {
  type: string;
  payload?: T;
}
