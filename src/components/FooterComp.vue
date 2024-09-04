<template>
  <footer class="bg-white py-5 text-center text-teal-950 text-xl">
    <p class="mb-1">目前僅做為個人時間管理使用，提供本地端儲存的番茄鐘小專案，歡迎使用!</p>
    <p class="text-base">若有任何feedback、建議、bug回報，可以透過以下管道聯繫我</p>
    <ul class="mx-auto w-fit mt-6 *:mb-2">
      <li class="hover:underline">
        <a href="mailto:poola12320@gmail.com" class="flex items-center"
          ><img
            class="max-w-full me-2 size-8"
            src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png"
            alt="contentMethod__mail"
          />
          poola12320@gmail.com
        </a>
      </li>
      <li>
        <a class="flex gap-1 items-center" href="#" @click.prevent=""
          ><img
            class="max-w-full me-2 size-8"
            src="https://cdn-icons-png.flaticon.com/128/5968/5968756.png"
            alt="contentMethod__discord"
          />
          使用者名稱: poola12320</a
        >
      </li>
    </ul>
  </footer>
</template>
<script setup lang="ts"></script>
