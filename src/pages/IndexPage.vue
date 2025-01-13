<script setup lang="ts">
import { onMounted, ref } from "vue";
import postService from "@/service/PostsService";
import useUser from "@/composables/useUser";

const userId = ref();

// пример без композабла
const handleGetPostList = async () => {
  const [error, data] = await postService.getList();

  // обрабатываем ошибку средствами UI
  if (error) {
    alert(error);
    return;
  }

  // если ошибки нет, дальнейшая обработка
  console.log(data);
}


// пример с композаблом
const { getUserById, getUserList, targetUser } = useUser();

const handleGetUserList = async () => {
  const error = await getUserList();

  if (error) alert(error);
}

const handleGetUserById = async () => {
  const error = await getUserById(userId.value)

  if (error) alert(error.message);
}

onMounted(async () => {
  console.log("fetch on mounted: ");
  await handleGetPostList();
  await handleGetUserList();
});
</script>

<template>
  <h1>Open the console to see the output :)</h1>

  <br />

  <label for="user-id">User id: </label>
  <input v-model="userId" id="user-id" type="text">
  <button @click="handleGetUserById">Get a certain user</button>

  <h1>User data</h1>
  <template v-if="targetUser">
    {{ targetUser.name }}
    {{ targetUser.email }}
    {{ targetUser.address.street }}
  </template>
  <template v-else>No user</template>
</template>

<style scoped lang="scss"></style>
