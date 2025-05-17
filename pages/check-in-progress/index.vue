<script setup>
const { $swal } = useNuxtApp();

import { useCheckinTableData } from "@/composables/useCheckinTableData";
import { formatDate } from "@/utils/dateFormatter";

// 搜尋和每頁筆數變數
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const debounceTimer = ref(null);

/* ------------------------- 獲取資料 ------------------------- */
const data = ref(null);
const fetchData = async () => {
  try {
    const search = searchQuery.value.trim();

    const url = `${process.env.API_BASE_URL}/dashboard/?page=${currentPage.value}&page_size=${pageSize.value}&search=${search}&sort_by=completed_count&sort_order=desc`;

    const res = await $fetch(url);

    const processed = useCheckinTableData(
      res.avatar_url,
      res.users,
      res.stats,
      res.pagination,
      res.updated_at,
      res.completed_count,
      "2025-05-01"
    );

    const storedKeyword = localStorage.getItem("searchKeyword")?.toLowerCase();

    // 檢查目前資料中是否已有包含該關鍵字的使用者（僅檢查 global_name）
    const alreadyExists = processed.processedUsers.some((user) =>
      user.global_name?.toLowerCase().includes(storedKeyword)
    );

    // 若：
    //    - 有儲存的關鍵字
    //    - 且目前為第一頁
    if (storedKeyword && currentPage.value === 1) {
      // 額外發送請求：僅查詢該關鍵字的使用者資料（最多 1 筆）
      const userSearchRes = await $fetch(
        `${process.env.API_BASE_URL}/dashboard/?page=1&page_size=1&search=${storedKeyword}`
      );

      // 處理回傳的單筆使用者資料
      const userData = useCheckinTableData(
        userSearchRes.avatar_url,
        userSearchRes.users,
        userSearchRes.stats,
        userSearchRes.pagination,
        userSearchRes.updated_at,
        userSearchRes.completed_count,
        "2025-05-01"
      );

      // 若成功查到該使用者 → 插入到資料最前方
      if (userData.processedUsers.length > 0) {
        const searchUser = userData.processedUsers[0];

        // 先移除與前一次搜尋結果相同的使用者 (避免在第一頁重複而跑出兩筆資料)
        processed.processedUsers = processed.processedUsers.filter(
          (user) => user.author_id !== searchUser.author_id
        );

        // 再插入最前面
        processed.processedUsers.unshift(searchUser);
      }
    }

    data.value = processed;
  } catch (error) {
    $swal.fire({
      icon: "error",
      title: error?.data || "發生錯誤，請稍後再試",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

/* ---- 儲存使用者搜尋過的關鍵字，方便將常用的搜尋結果優先顯示 ---- */
watch(searchQuery, (newQuery) => {
  const trimmedQuery = newQuery.trim();
  const storedKeyword = localStorage.getItem("searchKeyword") || "";

  if (trimmedQuery && trimmedQuery !== storedKeyword) {
    localStorage.setItem("searchKeyword", trimmedQuery);
  }

  debouncedSearch();
});

/* ------------------------- 頁碼處理 ------------------------- */
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

/* ----------------- 監聽器與生命週期 ----------------- */
// 防抖搜尋處理（300ms）
const debouncedSearch = () => {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    currentPage.value = 1;
    fetchData();
  }, 300);
};

onMounted(() => fetchData());
watch([currentPage, pageSize], () => fetchData());
watch(searchQuery, debouncedSearch);
</script>

<template>
  <!-- Begin Page Content -->
  <div class="w-100 px-4 px-md-5 py-4 height-100vh">
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
                  v-model="pageSize"
                  @change="currentPage = 1"
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
                  placeholder="請輸入顯示名稱"
                  aria-controls="dataTable"
                  v-model="searchQuery"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="table-responsive mt-3">
          <table
            v-if="data?.processedUsers.length > 0"
            class="table table-bordered table-hover"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead class="table-light">
              <tr>
                <th class="sticky-col">使用者</th>
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
                  avatar_url,
                  global_name,
                  author_id,
                  username,
                  completed_count,
                  days,
                } in data?.processedUsers"
                :key="author_id"
              >
                <td class="sticky-col">
                  <NuxtImg
                    :src="avatar_url"
                    alt="avatar-image"
                    width="30"
                    height="30"
                    class="rounded-circle me-2"
                  />{{ global_name }} ({{ username }})
                </td>
                <td class="text-center">
                  {{ completed_count }}
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
          <div class="py-4" v-else-if="data?.processedUsers.length === 0">
            <h2 class="fs-5 fs-lg-2">無符合搜尋結果的資料</h2>
          </div>
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
              {{
                data?.pagination
                  ? `Showing ${
                      (data.pagination.current_page - 1) *
                        data.pagination.page_size +
                      1
                    } 
          to ${Math.min(
            data.pagination.current_page * data.pagination.page_size,
            data.pagination.total_count
          )} 
          of ${data.pagination.total_count} entries`
                  : "Loading..."
              }}
            </div>
          </div>
          <div class="col-sm-6 mt-2 mt-sm-0">
            <div class="f-md-end-center">
              <ul class="pagination">
                <li
                  class="paginate_button page-item previous"
                  :class="{ disabled: currentPage === 1 }"
                >
                  <a
                    href="#"
                    aria-controls="dataTable"
                    class="page-link"
                    @click.prevent="
                      currentPage > 1 && changePage(currentPage - 1)
                    "
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
                <li
                  class="paginate_button page-item next"
                  id="dataTable_next"
                  :class="{
                    disabled: currentPage === data?.pagination?.total_pages,
                  }"
                >
                  <a
                    href="#"
                    aria-controls="dataTable"
                    class="page-link"
                    @click.prevent="
                      currentPage < data?.pagination?.total_pages &&
                        changePage(currentPage + 1)
                    "
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
.table-responsive {
  height: 480px;

  @include mobile {
    height: 100%;
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
.sticky-col {
  position: sticky;
  left: 0;
  z-index: 2;
  background-color: $white;
  white-space: nowrap;

  @include mobile {
    position: static;
  }
}

.table thead th.sticky-col {
  z-index: 3;
}
</style>
