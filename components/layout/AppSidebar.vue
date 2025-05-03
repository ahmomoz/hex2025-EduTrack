<script setup>
onMounted(() => {
  const body = document.body;
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarToggleTop = document.getElementById("sidebarToggleTop");
  const scrollTopBtn = document.querySelector(".scroll-to-top");

  const toggleSidebar = () => {
    body.classList.toggle("sidebar-toggled");
    sidebar?.classList.toggle("toggled");
    if (sidebar?.classList.contains("toggled")) {
      const collapses = sidebar.querySelectorAll(".collapse");
      collapses.forEach((el) => {
        if (el.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getInstance(el);
          bsCollapse?.hide();
        }
      });
    }
  };

  sidebarToggle?.addEventListener("click", toggleSidebar);
  sidebarToggleTop?.addEventListener("click", toggleSidebar);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      const collapses = sidebar?.querySelectorAll(".collapse") || [];
      collapses.forEach((el) => {
        const bsCollapse = bootstrap.Collapse.getInstance(el);
        bsCollapse?.hide();
      });
    }

    if (window.innerWidth < 480 && !sidebar?.classList.contains("toggled")) {
      body.classList.add("sidebar-toggled");
      sidebar?.classList.add("toggled");
      const collapses = sidebar?.querySelectorAll(".collapse") || [];
      collapses.forEach((el) => {
        const bsCollapse = bootstrap.Collapse.getInstance(el);
        bsCollapse?.hide();
      });
    }
  });

  // scroll-to-top 顯示/隱藏
  document.addEventListener("scroll", () => {
    if (scrollTopBtn) {
      scrollTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
    }
  });

  // 平滑捲動
  scrollTopBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
  document.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <ul
    class="navbar-nav bg-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <NuxtLink class="sidebar-brand f-align-center" to="/">
      <div class="fw-medium">六角體驗營小幫手</div>
    </NuxtLink>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <NuxtLink class="nav-link" to="/">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </NuxtLink>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">TRACK</div>

    <!-- Nav Item - Tables -->
    <li class="nav-item mt-2">
      <NuxtLink class="nav-link py-2" to="/check-in-progress">
        <i class="fas fa-fw fa-table"></i>
        <span>打卡進度追蹤</span>
      </NuxtLink>
    </li>

    <!-- Nav Item - Search -->
    <li class="nav-item">
      <NuxtLink class="nav-link py-2" to="/search">
        <i class="fas fa-fw fa-user"></i>
        <span>個人進度查詢</span>
      </NuxtLink>
    </li>

    <!-- Nav Item - Charts
    <li class="nav-item">
      <NuxtLink class="nav-link py-2" to="/charts">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>數據報表</span>
      </NuxtLink>
    </li> -->

    <!-- Heading -->
    <div class="sidebar-heading mt-4">LIST</div>

    <!-- Nav Item - Tasks -->
    <li class="nav-item mt-2">
      <NuxtLink class="nav-link py-2" to="/tasks">
        <i class="fas fa-fw fa-clipboard-list"></i>
        <span>每日任務列表</span>
      </NuxtLink>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline mt-5">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>

  <!-- Sidebar Toggler (TopBar) -->
  <button
    id="sidebarToggleTop"
    class="btn btn-link d-md-none rounded-circle mr-3 position-absolute"
  >
    <i class="fa fa-bars fs-5"></i>
  </button>

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>
</template>

<style lang="scss" scoped>
.sidebar {
  transition: width 0.3s ease, opacity 0.3s ease;
}
#sidebarToggleTop {
  right: 0;
  padding-top: 28px;
  padding-right: 30px;
  z-index: 100;
}
</style>
