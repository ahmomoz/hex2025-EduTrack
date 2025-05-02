<script setup>
const tasks = {
  htmlAndCss: [
    {
      id: 1,
      date: "2025/04/28",
      title: "切版任務 Day1 - HTML 標籤元素、CSS 判斷",
      link: "https://hackmd.io/x-Xk5ZwyRPGZhVqYISPYZA",
    },
    {
      id: 2,
      date: "2025/04/29",
      title: "切版任務 Day2 - 圖片處理技巧",
      link: "https://hackmd.io/iZ6WaLpzS52vsQOV3xKk_w",
    },
  ],
  javaScript: [
    {
      id: 1,
      date: "2025/04/28",
      title: "JS 任務 Day1 - 字串、數字相加",
      link: "https://hackmd.io/tOqQkcxzQRGaS4HRS-FsiQ",
    },
    {
      id: 2,
      date: "2025/04/29",
      title: "JS 任務 Day2 - 數字處理",
      link: "https://hackmd.io/-W15eqx5TFmPWbCG8g-HCQ",
    },
  ],
};
</script>

<template>
  <div id="content-wrapper" class="d-flex flex-column height-100vh pt-4">
    <!-- Main Content -->
    <div id="content">
      <!-- Begin Page Content -->
      <div class="container-fluid">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>

        <!-- Content Row -->
        <div class="row">
          <!-- Earnings (Monthly) Card Example -->
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 p-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center h-100">
                  <div class="col">
                    <div class="font-weight-bold text-primary mb-1">
                      連續 21 天完成每日任務打卡人數
                    </div>
                    <div class="fs-3 mb-0 fw-bold">
                      21 <span class="fs-6 fw-light">人</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
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
                      Tasks
                    </div>
                    <div class="row no-gutters align-items-center">
                      <div class="col-auto">
                        <div class="fs-3 mb-0 fw-bold">50%</div>
                      </div>
                      <div class="col">
                        <div class="progress progress-sm mr-2">
                          <div
                            class="progress-bar bg-info"
                            role="progressbar"
                            style="width: 50%"
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
                      4 <span class="fs-6 fw-light">天</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Row -->

        <div class="row">
          <!-- Chart -->
          <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">
              <!-- Card Header - Dropdown -->
              <div
                class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
              >
                <h6 class="m-0 font-weight-bold text-primary">
                  每日任務打卡數量
                </h6>
              </div>
              <!-- Card Body -->
              <div class="card-body">
                <div class="chart-area">
                  <ChartCheckinLineChart />
                </div>
              </div>
            </div>
          </div>

          <!-- Chart -->
          <div class="col-xl-4 col-lg-5">
            <div class="card shadow mb-4">
              <!-- Card Header - Dropdown -->
              <div
                class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
              >
                <h6 class="m-0 font-weight-bold text-primary">今日任務</h6>
              </div>
              <!-- Card Body -->
              <div class="card-body px-4">
                <div class="f-center">
                  <img
                    src="/img/undraw_learning_2jue.svg"
                    alt="learning-image"
                    class="img-fluid"
                    style="width: 16rem"
                  />
                </div>
                <ul class="f-column gap-3 mt-3">
                  <li class="f-column gap-2">
                    <span class="fs-5">
                      <i class="fas fa-circle text-primary me-1"></i>
                      切版
                    </span>
                    <a
                      :href="tasks.htmlAndCss[tasks.htmlAndCss.length - 1].link"
                      target="_blank"
                      class="fs-5 text-decoration-none slide-right-hover"
                    >
                      {{ tasks.htmlAndCss[tasks.htmlAndCss.length - 1].title }}
                    </a>
                  </li>
                  <li class="f-column gap-2">
                    <span class="fs-5">
                      <i class="fas fa-circle text-warning me-1"></i>
                      JavaScript
                    </span>
                    <a
                      :href="tasks.javaScript[tasks.javaScript.length - 1].link"
                      target="_blank"
                      class="fs-5 text-decoration-none slide-right-hover"
                    >
                      {{ tasks.javaScript[tasks.javaScript.length - 1].title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Row -->
        <div class="row">
          <!-- Content Column -->
          <div class="col-lg-6 mb-4">
            <!-- Project Card Example -->
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Projects</h6>
              </div>
              <div class="card-body">
                <h4 class="small font-weight-bold">
                  Server Migration <span class="float-right">20%</span>
                </h4>
                <div class="progress mb-4">
                  <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 20%"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 class="small font-weight-bold">
                  Sales Tracking <span class="float-right">40%</span>
                </h4>
                <div class="progress mb-4">
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style="width: 40%"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 class="small font-weight-bold">
                  Customer Database <span class="float-right">60%</span>
                </h4>
                <div class="progress mb-4">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: 60%"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 class="small font-weight-bold">
                  Payout Details <span class="float-right">80%</span>
                </h4>
                <div class="progress mb-4">
                  <div
                    class="progress-bar bg-info"
                    role="progressbar"
                    style="width: 80%"
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 class="small font-weight-bold">
                  Account Setup <span class="float-right">Complete!</span>
                </h4>
                <div class="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style="width: 100%"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <!-- Illustrations -->
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Illustrations</h6>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <img
                    class="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    style="width: 25rem"
                    src="/img/undraw_posting_photo.svg"
                    alt="..."
                  />
                </div>
                <p>
                  Add some quality, svg illustrations to your project courtesy
                  of
                  <a target="_blank" rel="nofollow" href="https://undraw.co/"
                    >unDraw</a
                  >, a constantly updated collection of beautiful svg images
                  that you can use completely free and without attribution!
                </p>
                <a target="_blank" rel="nofollow" href="https://undraw.co/"
                  >Browse Illustrations on unDraw &rarr;</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- End of Main Content -->
  </div>
</template>

<style lang="scss" scoped></style>
