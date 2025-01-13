import usersService from "@/service/UsersService";
import type { User } from "@/types";
import { ref } from "vue";

const useUser = () => {
  const userList = ref<User[]>([]);
  const targetUser = ref<User>();

  const getUserById = async (id: number) => {
    const [error, data] = await usersService.getById(id);

    // делигируем вывод сообщения об ошибке UI
    if (error) return error;

    if (data) {
      // оперируем данными
      targetUser.value = data;
      console.log(data);
    }
  }

  const getUserList = async () => {
    const [error, data] = await usersService.getList();

    if (error) return error;

    if (data) {
      userList.value = data;
      console.log(userList.value);
    }
  }

  return {
    userList,
    targetUser,
    getUserList,
    getUserById,
  }
}

export default useUser;
