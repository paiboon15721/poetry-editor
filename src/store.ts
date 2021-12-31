import { makeAutoObservable } from 'mobx'
import { createRef, RefObject } from 'react'

type Dr = 'u' | 'r' | 'l' | 'd'
type Dg = 0 | 90 | 180 | 270
type V = { v: string; dg: Dg }

const drMapper: { [key in Dr]: string } = {
  u: '↑',
  d: '↓',
  r: '→',
  l: '←',
}

class Store {
  constructor() {
    makeAutoObservable(this, {
      refs: false,
      i: false,
    })
    this.initialVs()
  }

  dg: 0 | 90 | 180 | 270 = 0
  dr: Dr = 'r'

  initialVs() {
    const data = localStorage.getItem('data')
    const buildInitialValues = (n: number) =>
      Array(n * n)
        .fill(null)
        .map(() => ({ v: '', dg: 0 }))
    this.setVs(data ? JSON.parse(data) : buildInitialValues(80))
  }

  changeDg() {
    if (this.dg === 270) {
      this.dg = 0
      return
    }
    this.dg += 90
  }

  get drArrow() {
    return drMapper[this.dr]
  }

  refs: RefObject<HTMLInputElement>[] = []
  vs: V[] = []
  i: number = 0

  setVs(values: V[]) {
    this.vs = values
    this.refs = values.map(() => createRef())
    this.save()
  }

  clear() {
    localStorage.clear()
    this.initialVs()
  }

  save() {
    localStorage.setItem('data', JSON.stringify(this.vs))
  }

  setV(v: string) {
    if (v === ' ') return
    this.vs[this.i] = {
      v,
      dg: this.dg,
    }
    this.save()
  }

  select(i: number) {
    if (i < 0 || i > this.vs.length - 1) return
    setTimeout(() => {
      this.refs[i].current?.select()
      this.i = i
    }, 0)
  }

  moveLeft(shift = false) {
    if (shift) {
      this.dr = 'l'
      return
    }
    this.select(this.i - 1)
  }

  moveRight(shift = false) {
    if (shift) {
      this.dr = 'r'
      return
    }
    this.select(this.i + 1)
  }

  moveUp(shift = false) {
    if (shift) {
      this.dr = 'u'
      return
    }
    this.select(this.i - this.sqrt)
  }

  moveDown(shift = false) {
    if (shift) {
      this.dr = 'd'
      return
    }
    this.select(this.i + this.sqrt)
  }

  onKeyDown(key: string, shift = false) {
    const strategies: { [key in string]: () => void } = {
      ArrowLeft: () => this.moveLeft(shift),
      ArrowRight: () => this.moveRight(shift),
      ArrowUp: () => this.moveUp(shift),
      ArrowDown: () => this.moveDown(shift),
      ' ': () => this.changeDg(),
    }
    const func = strategies[key]
    if (func) {
      func()
    }
    if ((key.length === 1 || key === 'Backspace') && key !== ' ') {
      const moveStrategies: { [key in Dr]: () => void } = {
        u: () => this.moveUp(),
        d: () => this.moveDown(),
        l: () => this.moveLeft(),
        r: () => this.moveRight(),
      }
      moveStrategies[this.dr]()
    }
  }

  get sqrt() {
    return Math.sqrt(this.vs.length)
  }

  import(f: File) {
    const reader = new FileReader()
    reader.onload = e => {
      this.setVs(JSON.parse(e.target?.result as string))
    }
    reader.readAsText(f)
  }

  export() {
    const e = document.createElement('a')
    e.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${JSON.stringify(this.vs)}`,
    )
    e.setAttribute('download', 'poetry.txt')
    e.style.display = 'none'
    document.body.appendChild(e)
    e.click()
    document.body.removeChild(e)
  }
}

export const store = new Store()
