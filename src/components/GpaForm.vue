<template>
  <q-card class="q-pa-md">
    <q-form ref="form_ref" @submit="addSubject" @reset="onReset">
      <!-- input -->
      <div class="flex justify-center q-gutter-md">
        <q-input
          v-model="name"
          outlined
          label="ชื่อวิชา"
          hide-bottom-space
          :rules="[(val) => !!val || 'กรุณากรอกชื่อวิชา']"
        ></q-input>
        <q-input
          v-model="credit"
          outlined
          label="หน่วยกิต"
          hide-bottom-space
          :rules="[
            (val) => (val !== null && val !== '') || 'กรุณากรอกหน่วยกิต',
            (val) => val > 0 || 'หน่วยกิตต้องมากกว่า 0',
            (val) => val <= 10 || 'หน่วยกิตต้องไม่เกิน 10',
          ]"
        ></q-input>
        <q-input
          v-model="score"
          outlined
          label="คะแนน (1-100)"
          hide-bottom-space
          :rules="[
            (val) => (val !== null && val !== '') || 'กรุณากรอกคะแนน',
            (val) => (val >= 0 && val <= 100) || 'คะแนนต้องอยู่ระหว่าง 0-100',
          ]"
        ></q-input>
        <q-input v-model="grade" outlined label="เกรด" disable class="bg-blue-2"></q-input>
      </div>
      <!-- btn submit -->
      <div class="flex justify-center q-mt-md">
        <q-btn
          type="submit"
          style="min-width: 200px"
          label="เพิ่มรายวิชาลงในรายการ"
          icon="add_circle"
          color="blue-7"
        ></q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSubjectStore } from '@/stores/subjectStore'

const subjectStore = useSubjectStore()

const form_ref = ref(null)
const name = ref('')
const credit = ref(1)
const score = ref(0)

// คำนวณเกรดอัตโนมัติจากคะแนน
const getGrade = computed(() => {
  const s = Number(score.value)

  if (s >= 80) {
    return { grade: 'A', gradeScore: 4.0 }
  } else if (s >= 75) {
    return { grade: 'B+', grade_score: 3.5 }
  } else if (s >= 70) {
    return { grade: 'B', grade_score: 3.0 }
  } else if (s >= 65) {
    return { grade: 'c+', grade_score: 2.5 }
  } else if (s >= 60) {
    return { grade: 'C', gradeScore: 2.0 }
  } else if (s >= 55) {
    return { grade: 'D+', gradeScore: 1.5 }
  } else if (s >= 50) {
    return { grade: 'D', gradeScore: 1.0 }
  } else {
    return { grade: 'E', gradeScore: 0 }
  }
})

// ค่าเกรด
const grade = computed(() => getGrade.value.grade)

// เพิ่มรายวิชา
const addSubject = () => {
  const gradeScore = getGrade.value.gradeScore

  subjectStore.addNewSubject({
    id: Date.now(),
    name: name.value,
    credit: credit.value,
    score: score.value,
    grade: getGrade.value.grade,
    grade_score: gradeScore,
    grade_point: gradeScore * credit.value,
  })

  // บอกฟอร์มให้ล้างค่า
  form_ref.value.reset()
}

// ล้างค่า
const onReset = () => {
  name.value = ''
  credit.value = 1
  score.value = 0
}
</script>
