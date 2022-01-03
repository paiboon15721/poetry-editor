import { createRef, RefObject } from 'react'
import { Dg, Dr, drMapper, V, buildInitialValues } from './types'

class Store {
  setVs(values: V[]) {
    this.vs = values
    if (this.refs.length) {
      this.setVsToRefs()
    } else {
      this.refs = values.map(() => createRef())
    }
    this.save()
  }

  private initialVs() {
    const data = localStorage.getItem('data')
    this.setVs(data ? JSON.parse(data) : buildInitialValues())
  }

  constructor() {
    this.initialVs()
  }

  dg: Dg = 0
  dr: Dr = 'r'
  refs: RefObject<HTMLInputElement>[] = []
  vs: V[] = []
  i: number = 0

  get sqrt() {
    return Math.sqrt(this.refs.length)
  }

  get drArrow() {
    return drMapper[this.dr]
  }

  get current() {
    return this.refs[this.i].current!
  }

  setVsToRefs() {
    this.vs.forEach((x, i) => {
      const c = this.refs[i].current
      if (c) {
        c.value = x.v
        c.style.transform = `rotate(${x.dg}deg)`
      }
    })
  }

  setV(v: string) {
    this.current.style.transform = `rotate(${this.dg}deg)`
    this.current.value = v
    this.vs[this.i] = {
      v,
      dg: this.dg,
    }
    this.save()
  }

  select(i: number) {
    if (i < 0 || i > this.refs.length - 1) return
    this.i = i
    this.current.select()
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

  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const strategies: { [key in string]: () => void } = {
      ArrowLeft: () => this.moveLeft(e.shiftKey),
      ArrowRight: () => this.moveRight(e.shiftKey),
      Tab: () => e.preventDefault(),
      ArrowUp: () => this.moveUp(e.shiftKey),
      ArrowDown: () => this.moveDown(e.shiftKey),
      ' ': () => this.changeDg(),
    }
    const func = strategies[e.key]
    if (func) {
      func()
      return
    }
    if (e.key === 'Backspace') {
      const moveStrategies: { [key in Dr]: () => void } = {
        u: () => this.moveDown(),
        d: () => this.moveUp(),
        l: () => this.moveRight(),
        r: () => this.moveLeft(),
      }
      this.setV('')
      moveStrategies[this.dr]()
      return
    }
    if (e.key.length === 1 && e.key !== ' ') {
      const moveStrategies: { [key in Dr]: () => void } = {
        u: () => this.moveUp(),
        d: () => this.moveDown(),
        l: () => this.moveLeft(),
        r: () => this.moveRight(),
      }
      this.setV(e.key)
      moveStrategies[this.dr]()
    }
  }

  changeDg() {
    if (this.dg === 270) {
      this.dg = 0
      return
    }
    this.dg += 90
  }

  clear() {
    localStorage.clear()
    this.initialVs()
  }

  save() {
    localStorage.setItem('data', JSON.stringify(this.vs))
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
