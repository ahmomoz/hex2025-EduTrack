<script setup></script>

<template>
  <div class="container-fluid pt-4 bg-light height-100vh">
    <!-- Page Heading -->
    <h1 class="h3 text-gray-800">Search</h1>

    <div class="container wrap-sm">
      <div class="row f-center">
        <div class="col-lg-6">
          <div class="p-lg-5">
            <div class="text-center">
              <h2 class="h4 text-gray-900 mb-2">每日任務個人進度查詢</h2>
              <p class="mb-4">
                請輸入 CodePen 帳號後按下查詢按鈕<br />
                即可查看切版任務及 JavaScript 任務的繳交狀況
              </p>
            </div>
            <form class="user">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-user py-3"
                  id="userSearch"
                  aria-describedby="userSearch"
                  placeholder="請輸入 CodePen 帳號"
                />
              </div>
              <button
                class="btn btn-primary btn-user btn-block text-white w-100 mt-3"
              >
                查詢
              </button>
            </form>
          </div>
        </div>
        <div class="col-lg-6 mt-5 mt-lg-0">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-gray-800">搜尋結果</h6>
            </div>
            <div class="card-body px-5 py-4">
              <div class="f-center">
                <img
                  src="/img/undraw_join_6quk.svg"
                  alt="learning-image"
                  class="img-fluid"
                  style="width: 14rem"
                />
              </div>
              <ul class="f-column gap-3 mt-3">
                <li class="f-column gap-2">
                  <span class="fs-5">
                    <i class="fas fa-circle text-primary me-1"></i>
                    切版每日任務
                  </span>
                  <p>目前已完成 10 個任務</p>
                </li>
                <li class="f-column gap-2">
                  <span class="fs-5">
                    <i class="fas fa-circle text-warning me-1"></i>
                    JavaScript 每日任務
                  </span>
                  <p>目前已完成 9 個任務</p>
                </li>
              </ul>
            </div>
          </div>

          <!-- <div class="card shadow mt-3 mt-lg-5">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-gray-800">搜尋結果</h6>
            </div>
            <div class="card-body py-3 py-lg-5">
              <div class="f-center">
                <img
                  src="/img/undraw_file-search_cbur.svg"
                  alt="learning-image"
                  class="img-fluid"
                  style="width: 14rem"
                />
              </div>
              <div class="f-center gap-3 mt-3 mt-lg-5">
                <h3>請輸入 CodePen 帳號進行搜尋</h3>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 48px;

  @include lg-pc {
    margin-top: 0;
  }
}
</style>
