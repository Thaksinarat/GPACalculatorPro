import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
export const useSubjectStore = defineStore(
  'subject',
  () => {
    // เก็บรายวิชาทั้งหมด
    const allSubjects = ref([])

    // ตัวโหลด
    const isLoading = ref(true)

    // หน่วงการโหลด
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    })

    // รวมหน่วยกิตสะสม
    const sumCredit = computed(() => {
      return allSubjects.value.reduce((sum, item) => sum + Number(item.credit), 0)
    })

    // ค่า GPA
    const gpa = computed(() => {
      const sumGradePoint = allSubjects.value.reduce(
        (sum, item) => sum + Number(item.grade_point),
        0,
      )
      return (sumGradePoint / sumCredit.value).toFixed(2)
    })

    // ฟังก์ชันเพิ่ม
    const addNewSubject = (newSubject) => {
      allSubjects.value.push(newSubject)
      console.log('💚 Add!')
    }

    // ฟังก์ชันลบรายวิชา
    const deleteSubject = (subject) => {
      const index = allSubjects.value.findIndex((item) => item.name == subject.name)
      allSubjects.value.splice(index, 1)

      console.log('⛔ Remove!')
    }

    // ฟังก์ชันลบทั้งหมด
    const deleteAllSubject = () => {
      allSubjects.value = []

      console.log('⛔⛔ Remove all!')
    }

    return {
      allSubjects,
      isLoading,
      sumCredit,
      gpa,
      addNewSubject,
      deleteSubject,
      deleteAllSubject,
    }
  },
  { persist: true },
)
