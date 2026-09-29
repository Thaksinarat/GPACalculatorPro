import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLogin = ref(false)
    const username = ref('')
    const password = ref('')

    const login = (name, pwd) => {
      if (name === 'student' && pwd === '123456') {
        username.value = name

        isLogin.value = true
      }
    }

    const logout = () => {
      isLogin.value = false
      username.value = ''
      password.value = ''
    }

    return {
      isLogin,
      username,
      password,
      login,
      logout,
    }
  },
  {
    persist: {
      pick: ['isLogin', 'username'],
    },
  },
)
// เพิ่ม persist: true เท่ากับค่าที่เราใส่ลงไปจะเป็นค่าถาวรที่จะถูกเก็บไว้ใน browser memmory เสมอ
// เราสามารถระบุได้ว่าจะ เก็บ หรือ ไม่เก็บ ค่าไหน (ในที่นี้เก็ยค่า username)
