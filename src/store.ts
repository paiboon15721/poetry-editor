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
  i: number = 0

  setVs(values: string[]) {
    this.vs = values
    this.refs = values.map(() => createRef())
  }

  setV(v: string) {
    this.vs[this.i] = v
  }

  select(i: number) {
    if (i < 0 || i > this.vs.length - 1) return
    this.i = i
    setTimeout(() => store.refs[i].current?.select(), 0)
  }

  moveLeft() {
    this.select(this.i - 1)
  }

  moveRight() {
    this.select(this.i + 1)
  }

  moveUp() {
    this.select(this.i - store.sqrt)
  }

  moveDown() {
    this.select(this.i + store.sqrt)
  }

  get sqrt() {
    return Math.sqrt(this.vs.length)
  }
}

export const store = new Store()
