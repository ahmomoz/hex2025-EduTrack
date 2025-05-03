<script setup>
const route = useRoute();
const { $swal } = useNuxtApp();

import { useCheckinTableData } from "@/composables/useCheckinTableData";
import { formatDate } from "@/utils/dateFormatter";

// 搜尋和每頁筆數
const searchQuery = ref();
const currentPage = ref(1);
const itemsPerPage = ref(10);

// 獲取資料
const { data, pending, refresh } = await useFetch(() => "/dashboard", {
  key: route.fullPath,
  initialCache: false,
  baseURL: process.env.API_BASE_URL,
  transform: (res) => {
    return useCheckinTableData(res.users, res.stats, "2025-04-28");
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
onMounted(() => console.log(data.value));
</script>

<template>
  <!-- Begin Page Content -->
  <div class="container-fluid py-4 height-100vh">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Tables</h1>

    <!-- DataTales Example -->
    <div class="card shadow mt-4">
      <div class="card-header py-4">
        <h2 class="fs-5 m-0 text-primary">每日任務打卡狀況</h2>
      </div>
      <div class="card-body container-fluid pt-3">
        <div class="row">
          <div class="col">
            <ol class="p-0">
              <li><p class="m-0">*資料更新頻率：一個小時更新一次</p></li>
              <li><p class="m-0">*只要在該日打卡討論串留言就算打卡成功</p></li>
            </ol>
          </div>
        </div>
        <div class="row f-between-center">
          <div class="col-sm-6 col-xxl-2">
            <div class="dataTables_length" id="dataTable_length">
              <label class="f-center gap-2">
                Show
                <select
                  name="dataTable_length"
                  aria-controls="dataTable"
                  class="form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </label>
            </div>
          </div>
          <div class="col-sm-6 col-xxl-3 mt-2 mt-sm-0">
            <div id="dataTable_filter" class="dataTables_filter text-end">
              <label class="f-center gap-2">
                Search:
                <input
                  type="search"
                  class="form-control form-control-sm"
                  placeholder="搜尋使用者名稱"
                  aria-controls="dataTable"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="table-responsive mt-3">
          <table
            v-if="data"
            class="table table-bordered table-hover"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead class="table-light">
              <tr>
                <th>使用者名稱</th>
                <th
                  v-for="(date, index) in data?.dateList"
                  :key="index"
                  :title="formatDate(date)"
                >
                  Day {{ index + 1 }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="{ author_id, username, days } in data?.processedUsers"
                :key="author_id"
              >
                <td>{{ username }}</td>
                <td
                  v-for="(checked, index) in days"
                  :key="index"
                  class="text-center"
                >
                  <i
                    v-if="checked"
                    class="fas fa-solid fa-check text-success"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="py-4" v-else>
            <h2 class="fs-5 fs-lg-2">請重新整理頁面</h2>
          </div>
        </div>

        <div class="row f-between-center mt-3">
          <div class="col-sm-6">
            <div
              class="dataTables_info"
              id="dataTable_info"
              role="status"
              aria-live="polite"
            >
              Showing 1 to 10 of {{ data?.processedUsers.length }} entries
            </div>
          </div>
          <div class="col-sm-6 mt-2 mt-sm-0">
            <div class="f-md-end-center">
              <ul class="pagination">
                <li
                  class="paginate_button page-item previous disabled"
                  id="dataTable_previous"
                >
                  <a
                    href="#"
                    aria-controls="dataTable"
                    data-dt-idx="0"
                    tabindex="0"
                    class="page-link"
                  >
                    <i class="fas fa-solid fa-angle-left"></i>
                  </a>
                </li>
                <li class="paginate_button page-item active">
                  <a
                    href="#"
                    aria-controls="dataTable"
                    data-dt-idx="1"
                    tabindex="0"
                    class="page-link"
                    >1</a
                  >
                </li>
                <li class="paginate_button page-item">
                  <a
                    href="#"
                    aria-controls="dataTable"
                    data-dt-idx="2"
                    tabindex="0"
                    class="page-link"
                    >2</a
                  >
                </li>
                <li class="paginate_button page-item">
                  <a
                    href="#"
                    aria-controls="dataTable"
                    data-dt-idx="3"
                    tabindex="0"
                    class="page-link"
                    >3</a
                  >
                </li>
                <li class="paginate_button page-item next" id="dataTable_next">
                  <a
                    href="#"
                    aria-controls="dataTable"
                    data-dt-idx="7"
                    tabindex="0"
                    class="page-link"
                  >
                    <i class="fas fa-solid fa-angle-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  max-width: calc(100vw - 227px);

  @include pad {
    max-width: 100%;
  }
}
.table-responsive {
  height: 500px;

  @include mobile {
    height: 420px;
  }
}
th,
td {
  white-space: nowrap; /* 防止文字折行 */
  overflow: hidden; /* 超出部分隱藏 */
  text-overflow: ellipsis; /* 超出部分顯示省略號 */
  padding: 10px;
}
</style>
