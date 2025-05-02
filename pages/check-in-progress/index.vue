<script setup></script>

<template>
  <!-- Begin Page Content -->
  <div class="container-fluid pt-4 height-100vh">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Tables</h1>

    <!-- DataTales Example -->
    <div class="card shadow mt-4">
      <div class="card-header py-4">
        <h2 class="fs-5 m-0 text-primary">
          每日任務打卡狀況
        </h2>
      </div>
      <div class="card-body container-fluid py-4">
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
          <div class="col-sm-6 col-xxl-2 mt-2 mt-sm-0">
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
            class="table table-bordered table-hover"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th v-for="(_, index) in 27" :key="index">
                  Day {{ index + 1 }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alex</td>
                <td v-for="(_, index) in 27" :key="index" class="text-center">
                  <i class="fas fa-solid fa-check text-success"></i>
                </td>
              </tr>
              <tr>
                <td>MoMo</td>
                <td v-for="(_, index) in 27" :key="index"></td>
              </tr>
              <tr>
                <td>Tiger</td>
                <td v-for="(_, index) in 27" :key="index" class="text-center">
                  <i class="fas fa-solid fa-check text-success"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row f-between-center mt-3">
          <div class="col-sm-6">
            <div
              class="dataTables_info"
              id="dataTable_info"
              role="status"
              aria-live="polite"
            >
              Showing 1 to 10 of 57 entries
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
th,
td {
  white-space: nowrap; /* 防止文字折行 */
  overflow: hidden; /* 超出部分隱藏 */
  text-overflow: ellipsis; /* 超出部分顯示省略號 */
  padding: 12px;
}
</style>
