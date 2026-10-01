import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // login?
    const isLogin = ref(true)
    // ข้อมูลผู้ใช้
    const username = ref('')
    const password = ref('')

    // function login
    const login = (name, pwd) => {
      if (name === 'student' && pwd === '123456') {
        username.value = name
        isLogin.value = true
        // login ได่้
        return true
      }
      // login ไม่ได้
      return false 
      
    }

    // function logout
    const logout = () => {
      isLogin.value = false
      username.value = ''
      password.value = ''
    }

    return {
      isLogin,
      username,
      login,
      logout,
    }
  },
  {
    persist: true,
  },
)
