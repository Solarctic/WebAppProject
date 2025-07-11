import { StoryEvent } from '@/composables/models/story-event'

// Custom Linked List from https://codedamn.com/news/nodejs/custom-data-structures

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  add(element) {
    const newNode = new Node(element)
    if (this.head === null) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.size++
  }

  insertAt(element, index) {
    if (index < 0 || index > this.size) {
      return false
    }

    const newNode = new Node(element)
    let current = this.head
    let previous
    let i = 0

    if (index === 0) {
      newNode.next = current
      this.head = newNode
    } else {
      while (i < index) {
        i++
        previous = current
        current = current.next
      }
      newNode.next = current
      previous.next = newNode
    }
    this.size++
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return null
    }

    let current = this.head
    let previous
    let i = 0

    if (index === 0) {
      this.head = current.next
    } else {
      while (i < index) {
        i++
        previous = current
        current = current.next
      }
      previous.next = current.next
    }
    this.size--
    return current.data
  }

  indexOf(element) {
    let current = this.head
    let index = 0

    while (current) {
      if (current.data === element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }

  isEmpty() {
    return this.size === 0
  }

  size() {
    return this.size
  }

  toString() {
    let current = this.head
    let result = ''

    while (current) {
      result += current.data + (current.next ? ' -> ' : '')
      current = current.next
    }
    return result
  }
}

export class StoryManager extends LinkedList {
  constructor(events = []) {
    super()

    for (const data of events) {
      this.add(new StoryEvent(data))
    }

    this.currentId = this.head?.data.id || null
  }

  findEventById(id) {
    let node = this.head
    for (let i = 0; i < this.size; i++) {
      if (node.data.id === id) {
        return node.data
      }
      node = node.next
    }

    return null
  }

  findNodeById(id) {
    let node = this.head
    for (let i = 0; i < this.size; i++) {
      if (node.data.id === id) {
        return node
      }
      node = node.next
    }

    return null
  }

  get getCurrentEvent() {
    return this.findEventById(this.currentId)
  }

  makeChoice(index) {
    const oldEvent = this.findNodeById(this.currentId)
    const nextId = oldEvent.data.getNextEventId(index)

    if (nextId && this.findEventById(nextId)) {
      this.currentId = nextId
      return this.getCurrentEvent
    } else {
      // If the event has next event then go there otherwise return null
      if (oldEvent.next) {
        this.currentId = oldEvent.next.data.id
        return oldEvent.next.data
      }
    }

    return null
  }

  skipThisEvent() {
    const oldEvent = this.findNodeById(this.currentId)
    if (oldEvent.next) {
      this.currentId = oldEvent.next.data.id
      return oldEvent.next.data
    }
  }

  // For Load fn
  jumpTo(index) {
    if (this.findEventById(index)) {
      this.currentId = this.findEventById(index).id
    }
  }
}
