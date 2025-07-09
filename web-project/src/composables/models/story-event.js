// Story Data
export class StoryEvent {
  constructor({ id, video, speaker, text, choices, responses, nextEvents }) {
    this.id = id
    this.video = video
    this.speaker = speaker
    this.text = text
    this.choices = choices
    this.responses = responses
    this.nextEvents = nextEvents
  }

  // Helper Functions
  hasChoices() {
    return this.choices.length != 0
  }

  getNextEventId(choiceIndex) {
    try {
      return this.nextEvents[choiceIndex] || null
    } catch {
      return null
    }
  }
}