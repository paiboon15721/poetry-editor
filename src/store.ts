import { makeAutoObservable } from 'mobx'
import { createRef, RefObject } from 'react'

class Store {
  constructor() {
    makeAutoObservable(this, {
      refs: false,
    })
  }

  refs: RefObject<HTMLInputElement>[] = []
  vs: string[] = []

  setVs(values: string[]) {
    this.vs = values
    this.refs = values.map(() => createRef())
  }

  setV(i: number, v: string) {
    this.vs[i] = v
  }

  select(i: number) {
    store.refs[i].current?.select()
  }

  get sqrt() {
    return Math.sqrt(this.vs.length)
  }
}

export const store = new Store()
