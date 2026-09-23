<template>
  <div v-if="isLoading == true" class="column items-center justify-center q-pa-xl">
    <!-- แสดง Loading -->
    <q-spinner-puff class="q-mb-md" color="primary" size="48px" :thickness="5" />
    <p class="text-grey">กำลังดึงข้อมูล...</p>
  </div>

  <div v-else>
    <div v-if="items.length > 0">
      <div>
        <div class="q-mt-lg flex justify-between">
          <!-- แสดงจำนวนรายวิชาและปุ่ม -->
          <p class="text-h6 text-bold">
            รายชื่อวิชา (<span>{{ items.length }}</span
            >)
          </p>
          <p @click="deleteAllSubject"><q-icon class="btn" name="delete_sweep" size="md" color="red-7" /></p>
        </div>
        <!-- แสดงรายการรายวิชาทั้งหมด -->
        <div>
          <!-- list -->
          <q-list bordered separator class="bg-white shadow-2">
            <!-- แต่ละรายวิชา -->
            <q-item
              class="flex justify-between"
              v-ripple
              v-for="subject in items"
              :key="subject.name"
            >
              <!-- เกรดที่ได้ -->
              <q-item-section avatar>
                <div class="row q-gutter-md">
                  <!-- avatar แสดงเกรด -->
                  <q-avatar
                    size="48px"
                    :class="{
                      'bg-positive': subject.grade == 'A',
                      'bg-green-7': subject.grade == 'B+',
                      'bg-green-6': subject.grade == 'B',
                      'bg-orange-8': subject.grade == 'C+',
                      'bg-orange-7': subject.grade == 'C',
                      'bg-deep-orange-6': subject.grade == 'D+',
                      'bg-deep-orange-8': subject.grade == 'D',
                      'bg-negative': subject.grade == 'E',
                    }"
                    text-color="white"
                    >{{ subject.grade }}</q-avatar
                  >
                  <!-- รายละเอียดวิชา -->
                  <div>
                    <span class="text-subtitle1 text-bold">{{ subject.name }}</span>
                    <p class="">
                      หน่วยกิต: <span>{{ subject.credit }}</span> | คะแนน:
                      <span>{{ subject.score }}</span>
                    </p>
                  </div>
                </div>
              </q-item-section>

              <q-item-section side>
                <div class="row q-gutter-lg">
                  <p>
                    GP: <span>{{ subject.grade_score.toFixed(1) }}</span>
                  </p>

                  <p @click="deleteSubject(subject)"><q-icon class="btn" name="delete_outline" color="red-5" size="20px"/></p>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="q-mt-lg flex justify-between">
        <!-- แสดงจำนวนรายวิชาและปุ่ม -->
        <p class="text-h6 text-bold">
          รายชื่อวิชา (<span>0</span
          >)
        </p>
        <q-icon class="btn" name="delete_sweep" size="md" color="red-7" />
      </div>

      <q-card>
        <div class="column items-center justify-center q-pa-xl">
          <q-icon size="48px" color="grey-5" name="list_alt" />
          <p class="text-grey-5">ยังไม่มีข้อมูลรายวิชาที่เพิ่มเข้ามา</p>
        </div>
      </q-card>
    </div>
  </div>
</template>

<style>
.btn:hover {
  cursor: pointer;
}
</style>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['delete-subject', 'delete-all-subject'])

// ลบรายวิชา
const deleteSubject = (s) => {
  emit('delete-subject', s)
}

// ลบทั้งหมด
const deleteAllSubject = () => {
  emit('delete-all-subject')
}
</script>
