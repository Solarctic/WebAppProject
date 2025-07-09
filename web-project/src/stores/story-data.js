// Story data
export const story = [
  {
    video: '/beginning.mp4', // 新增开头视频
    speaker: 'Narrator',
    text: 'Welcome to the court. Prepare for the adventure.',
    choices: [], // 无按钮，点击视频推进
    responses: [''],
  },
  {
    video: '/1.mp4',
    speaker: 'Phoenix Wright',
    text: "The court finds the defendant... Wait, this can't be right!",
    choices: [], // 还是无按钮，点击视频推进
    responses: [''],
  },
  {
    video: '/2.mp4',
    speaker: 'Miles Edgeworth',
    text: "The prosecution's case is airtight. What will you do?",
    choices: ['Press Testimony', 'Analyze Scene', 'Challenge Claim', 'Object Now!'],
    responses: [
      'The witness is clearly hiding something!',
      'The crime scene photos tell a different story!',
      'That claim contradicts the forensic evidence!',
      "OBJECTION! The prosecution's argument has fatal flaws!",
    ],
  },
  {
    video: '/3.mp4',
    speaker: 'Judge',
    text: 'The court will hear your final argument.',
    choices: ['Present Truth', 'Reveal Culprit', 'Expose Lies', 'Final Objection'],
    responses: [
      'The truth points to someone else entirely!',
      'The real culprit is in this courtroom right now!',
      'These lies have gone on long enough!',
      'OBJECTION! The defense has proven its case!',
    ],
  },
  {
    video: '/end.mp4',
    speaker: 'Judge',
    text: 'Court is adjourned. The defendant is... NOT GUILTY!',
    choices: [],
    responses: [],
  },
];