<script setup>
const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});

const taskProgress = computed(() => {
  const completed = props?.stats?.css?.length ?? 0;
  return (completed / 27).toFixed(2) * 100;
});
</script>

<template>
  <div class="row">
    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-primary shadow h-100 p-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center h-100">
            <div class="col">
              <div class="font-weight-bold text-primary mb-1">
                連續完成每日任務打卡人數
              </div>
              <div class="fs-3 mb-0 fw-bold">
                21 <span class="fs-6 fw-light">人</span>
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-check fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 p-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center h-100">
            <div class="col">
              <div class="font-weight-bold text-success mb-1">
                今日完成每日任務打卡人數
              </div>
              <div class="fs-3 mb-0 fw-bold">
                3 <span class="fs-6 fw-light">人</span>
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-user-check fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-info shadow h-100 p-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center h-100">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-info text-uppercase mb-1"
              >
                任務發布進度
              </div>
              <div class="row no-gutters align-items-center">
                <div class="col-auto">
                  <div class="fs-3 mb-0 fw-bold">
                    {{ taskProgress }}
                    %
                  </div>
                </div>
                <div class="col">
                  <div class="progress progress-sm mr-2">
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      :style="{
                        width: `${taskProgress}%`,
                      }"
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Requests Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-warning shadow h-100 p-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center h-100">
            <div class="col">
              <div class="font-weight-bold text-warning mb-1">
                每日任務已經累積
              </div>
              <div class="fs-3 mb-0 fw-bold">
                {{ props?.stats?.css.length }}
                <span class="fs-6 fw-light">天</span>
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
