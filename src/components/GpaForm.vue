<template>
  <q-card class="q-pa-md">
    <q-form @submit="addSubject">
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
            (val) => (val > 0 && val <= 100) || 'คะแนนต้องอยู่ระหว่าง 0-100',
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
import { ref, watch } from 'vue'
// ประกาศตัวแปรเก็บข้อมูลในฟอร์ม
const name = ref()
const credit = ref(1)
const score = ref(0)
const grade = ref()
const grade_score = ref()
const grade_point = ref()

// event
const emit = defineEmits(['add-subject'])

// watcher
watch([credit, score], ([newCredit, newScore]) => {
  if (
    newCredit !== '' &&
    newCredit !== null &&
    newCredit !== undefined &&
    newScore !== '' &&
    newScore !== null &&
    newScore !== undefined
  ) {
    // คำนวณเกรด
    calculateGrade(score)
  }
})

// เพิ่มรายวิชา
const addSubject = () => {
  // คำนวณค่า grade_point
  grade_point.value = grade_score.value * credit.value 

  console.log(name.value, credit.value, score.value, grade.value, grade_score.value, grade_point.value)
  const newSubject = {
    name: name.value,
    credit: credit.value,
    score: score.value,
    grade: grade.value,
    grade_score: grade_score.value,
    grade_point: grade_point.value,
  }
  // event เพิ่มรายวิชา
  emit('add-subject', newSubject)

  // reset ค่า
  name.value = ' '
  credit.value = 1
  score.value = 0
  grade.value = ''
  grade_score.value = ''
  grade_point.value = 0

}

// คำนวณเกรด
const calculateGrade = (score) => {
  if (score.value >= 80) {
    grade.value = 'A'
    grade_score.value = 4.0
  } else if (score.value >= 75) {
    grade.value = 'B+'
    grade_score.value = 3.5
  } else if (score.value >= 70) {
    grade.value = 'B'
    grade_score.value = 3.0
  } else if (score.value >= 65) {
    grade.value = 'C+'
    grade_score.value = 2.5
  } else if (score.value >= 60) {
    grade.value = 'C'
    grade_score.value = 2.0
  } else if (score.value >= 55) {
    grade.value = 'D+'
    grade_score.value = 1.5
  } else if (score.value >= 50) {
    grade.value = 'D'
    grade_score.value = 1.0
  } else {
    grade.value = 'E'
    grade_score.value = 0
  }
}
</script>
