<!-- ToDo: emit an event once the video player ends -->

<template>
  <video
    id="video-container"
    class="flex-1 min-h-0 m-4 bg-black rounded-[15px]"
    @click="$emit('advance')"
  ></video>
</template>
