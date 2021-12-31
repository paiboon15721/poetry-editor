import { makeAutoObservable } from 'mobx'
import { createRef, RefObject } from 'react'

class Store {
  constructor() {
    makeAutoObservable(this, {
      refs: false,
      i: false,
    })
    this.initialVs()
  }

  dg: 0 | 90 | 180 | 270 = 0

  initialVs() {
    const data = localStorage.getItem('data')
    const buildInitialValues = (n: number) => Array(n * n).fill('')
    this.setVs(data ? data.split(',') : buildInitialValues(10))
  }

  changeDeg() {
    if (this.dg === 270) {
      this.dg = 0
      return
    }
    this.dg += 90
  }

  refs: RefObject<HTMLInputElement>[] = []
  vs: string[] = []
  i: number = 0

  setVs(values: string[]) {
    this.vs = values
    this.refs = values.map(() => createRef())
    this.save()
  }

  clear() {
    localStorage.clear()
    this.initialVs()
  }

  save() {
    localStorage.setItem('data', this.vs.join())
  }

  setV(v: string) {
    this.vs[this.i] = v
    this.save()
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

  import(f: File) {
    const reader = new FileReader()
    reader.onload = e => {
      this.setVs((e.target?.result as string).split(','))
    }
    reader.readAsText(f)
  }

  export() {
    const e = document.createElement('a')
    e.setAttribute('href', `data:text/plain;charset=utf-8,${this.vs.join()}`)
    e.setAttribute('download', 'poetry.txt')
    e.style.display = 'none'
    document.body.appendChild(e)
    e.click()
    document.body.removeChild(e)
  }
}

export const store = new Store()
