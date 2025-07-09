<!-- ToDo: emit an event once the video player ends -->

<template>
  <video
    id="video-container"
    class="flex-1 min-h-0 m-4 max-w-fit bg-black rounded-[15px] self-center"
    @click="$emit('advance')"
  ></video>
</template>
