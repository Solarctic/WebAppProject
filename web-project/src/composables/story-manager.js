import { StoryEvent } from '@/composables/models/story-event'

export class StoryManager {
  constructor(events = []) {
    // ToDo: Change the data system. Prob use node list or something
    // Make a lookup table
    this.eventMap = new Map()

    for (const data of events) {
      this.eventMap[data.id] = new StoryEvent(data)
    }


    this.currentId = this.eventMap["scene-0"]?.id || null
  }

  get getCurrentEvent() {
    return this.eventMap[this.currentId]
  }

  makeChoice(index) {
    const nextId = this.getCurrentEvent.getNextEventId(index)

    if (nextId && this.eventMap[nextId]) {
        this.currentId = nextId
        return this.getCurrentEvent
    }

    return null
  }

  // For Load fn
  jumpTo(index) {
    if (this.eventMap[index]) {
      this.currentId = this.eventMap[index].id
    }
  }
}
