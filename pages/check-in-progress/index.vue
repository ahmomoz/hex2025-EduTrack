<script setup>
const { $swal } = useNuxtApp();

import { useCheckinTableData } from "@/composables/useCheckinTableData";
import { formatDate } from "@/utils/dateFormatter";

// 搜尋和每頁筆數變數
const searchQuery = ref();
const currentPage = ref(1);
const pageTotal = ref(10);

/* ----------------- 獲取資料 ----------------- */
const data = ref(null);
const fetchData = async (currentPage = 1) => {
  try {
    const res = await $fetch(`${process.env.API_BASE_URL}/dashboard/`);

    data.value = useCheckinTableData(
      res.users,
      res.stats,
      res.pagination,
      res.updated_at,
      "2025-05-01"
    );
    console.log(data.value);
  } catch (error) {
    $swal.fire({
      position: "center",
      icon: "error",
      title: error?.data || "發生未知錯誤，請稍後重試",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

onMounted(() => fetchData());

/* ----------------- 頁碼處理 ----------------- */
// 算出頁碼中間 ... 函式
const getVisiblePages = (totalPages) => {
  const pages = [];

  // 顯示的最大頁碼數（不含 ... 和上下箭頭）
  const maxVisiblePages = 3;

  if (totalPages <= 5) {
    // 小於等於 5 頁時全部顯示
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 開頭幾頁（1、2、3）
    if (currentPage.value <= 3) {
      for (let i = 1; i <= maxVisiblePages + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
    // 結尾幾頁
    else if (currentPage.value >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    // 中間滑動區域
    else {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage.value - 1);
      pages.push(currentPage.value);
      pages.push(currentPage.value + 1);
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return pages;
};

// 切換頁碼
const changePage = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <!-- Begin Page Content -->
  <div class="container-fluid py-4 height-100vh">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Tables</h1>

    <!-- DataTales Example -->
    <div class="card shadow mt-4">
      <div class="card-header py-3">
        <h2 class="fs-5 m-0 text-primary">每日任務打卡狀況</h2>
      </div>
      <div class="card-body container-fluid pt-3">
        <div class="row">
          <div class="col">
            <ol class="p-0">
              <li><p class="m-0">*只要在該日打卡討論串留言就算打卡成功</p></li>
              <li>
                <p class="m-0">
                  *資料更新頻率：一個小時更新一次（最後更新時間：
                  {{ data?.updatedAt }}）
                </p>
              </li>
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
                <th>累積打卡天數</th>
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
                v-for="{
                  global_name,
                  author_id,
                  username,
                  days,
                } in data?.processedUsers.sort(
                  (a, b) =>
                    b.days.filter((day) => day).length -
                    a.days.filter((day) => day).length
                )"
                :key="author_id"
              >
                <td>{{ global_name }} ({{ username }})</td>
                <td class="text-center">
                  {{ days.filter((day) => day).length }}
                </td>
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
            <h2 class="fs-5 fs-lg-2">載入中 ...</h2>
          </div>
        </div>

        <div class="row f-between-center mt-2">
          <div class="col-sm-6">
            <div
              class="dataTables_info"
              id="dataTable_info"
              role="status"
              aria-live="polite"
            >
              Showing 1 to {{ data?.pagination?.page_size }} of
              {{ data?.pagination?.total_count }} entries
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
                    class="page-link"
                    :disabled="currentPage === 1"
                    @click.prevent="changePage(page - 1)"
                  >
                    <i class="fas fa-solid fa-angle-left"></i>
                  </a>
                </li>
                <li
                  class="paginate_button page-item"
                  :class="{
                    active: page === currentPage,
                    disabled: page === '...',
                  }"
                  v-for="(page, index) in getVisiblePages(
                    data?.pagination?.total_pages
                  )"
                  :key="index"
                >
                  <a
                    href="#"
                    aria-controls="dataTable"
                    v-if="page !== '...'"
                    class="page-link"
                    @click.prevent="changePage(page)"
                  >
                    {{ page }}
                  </a>
                  <span v-else class="page-link">...</span>
                </li>
                <li class="paginate_button page-item next" id="dataTable_next">
                  <a
                    href="#"
                    aria-controls="dataTable"
                    class="page-link"
                    :disabled="currentPage === data?.pagination?.total_pages"
                    @click.prevent="changePage(page + 1)"
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
  height: 480px;

  @include mobile {
    height: 420px;
  }
}
th {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
  box-shadow: inset 0 -1px #dee2e6;
}
th,
td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px;
}
</style>
