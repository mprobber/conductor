export interface Store<A> {
  fetch: () => Promise<A[]>;
  add: A => Promise<A>;
}
