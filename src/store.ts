import { makeAutoObservable } from 'mobx'
import { createRef, RefObject } from 'react'

class Store {
  constructor() {
    makeAutoObservable(this, {
      refs: false,
    })
    this.initialVs()
  }

  initialVs() {
    const data = localStorage.getItem('data')
    const buildInitialValues = (n: number) => Array(n * n).fill('')
    this.setVs(data ? data.split(',') : buildInitialValues(80))
  }

  refs: RefObject<HTMLInputElement>[] = []
  vs: string[] = []
  i: number = 0

  setVs(values: string[]) {
    this.vs = values
    this.refs = values.map(() => createRef())
  }

  clear() {
    localStorage.clear()
    this.initialVs()
  }

  setV(v: string) {
    this.vs[this.i] = v
    localStorage.setItem('data', this.vs.join())
  }

  select(i: number) {
    if (i < 0 || i > this.vs.length - 1) return
    setTimeout(() => {
      this.refs[i].current?.select()
      this.i = i
    }, 0)
  }

  moveLeft() {
    this.select(this.i - 1)
  }

  moveRight() {
    this.select(this.i + 1)
  }

  moveUp() {
    this.select(this.i - this.sqrt)
  }

  moveDown() {
    this.select(this.i + this.sqrt)
  }

  get sqrt() {
    return Math.sqrt(this.vs.length)
  }
}

export const store = new Store()
