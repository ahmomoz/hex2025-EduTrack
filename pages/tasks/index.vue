<script setup>
const route = useRoute();

// 獲取資料
const { data: tasks, refresh } = await useFetch(() => "/tasks", {
  key: route.fullPath,
  initialCache: false,
  baseURL: process.env.API_BASE_URL,
  transform: (res) => {
    return res?.formatted_tasks;
  },
  onResponseError({ response }) {
    const { message } = response?.data;
    $swal.fire({
      position: "center",
      icon: "error",
      title: message || "發生未知錯誤，請稍後重試",
      showConfirmButton: false,
      timer: 1500,
    });
  },
});

watch(
  () => route.fullPath,
  () => {
    refresh();
  }
);
</script>

<template>
  <div class="container-fluid pt-4 height-100vh">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Task List</h1>

    <div class="container px-0 px-sm-4">
      <ul class="nav nav-tabs mt-5" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="htmlAndCss-tab"
            data-bs-toggle="tab"
            data-bs-target="#htmlAndCss"
            type="button"
            role="tab"
            aria-controls="htmlAndCss"
            aria-selected="true"
          >
            每日切版任務
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="javaScript-tab"
            data-bs-toggle="tab"
            data-bs-target="#javaScript"
            type="button"
            role="tab"
            aria-controls="javaScript"
            aria-selected="false"
          >
            每日 JS 任務
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="htmlAndCss"
          role="tabpanel"
          aria-labelledby="htmlAndCss-tab"
        >
          <div class="table-responsive mt-4">
            <table
              class="table table-bordered table-hover"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead class="table-light">
                <tr>
                  <th class="fw-medium date-col">日期</th>
                  <th class="fw-medium">連結</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="{ id, date, title, link } in tasks.htmlAndCss"
                  :key="id"
                >
                  <td>{{ date }}</td>
                  <td>
                    <a :href="link" target="_blank">{{ title }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="javaScript"
          role="tabpanel"
          aria-labelledby="javaScript-tab"
        >
          <div class="table-responsive mt-4">
            <table
              class="table table-bordered table-hover"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead class="table-light">
                <tr>
                  <th class="fw-medium date-col">日期</th>
                  <th class="fw-medium">連結</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="{ id, date, title, link } in tasks.javaScript"
                  :key="id"
                >
                  <td>{{ date }}</td>
                  <td>
                    <a :href="link" target="_blank">{{ title }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-col {
  width: 120px;
  min-width: 100px;
  max-width: 150px;
}
</style>
