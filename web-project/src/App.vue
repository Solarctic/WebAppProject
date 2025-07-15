<!-- Layout -->
<template>
  <div class="flex flex-col h-screen bg-indigo-600 text-white">
    <!-- This is where the scene being rendered -->
    <router-view class="flex-1 overflow-auto" />

    <!-- Copyright Website -->
    <footer class="p-[10px] text-center border-t-4 border-t-rose-500 text-sm">
      © 2025 Text Adventure
    </footer>
  </div>
</template>
