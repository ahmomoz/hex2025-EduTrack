// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    baseURL: process.env.NODE_ENV === "production" ? "/hex2025-EduTrack/" : "/",
    buildAssetsDir: "/static/",
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
        },
      ],
      viewport: "width=500, initial-scale=1",
      title: "2025 六角學院體驗營 - 每日任務打卡追蹤",
      meta: [
        {
          name: "description",
          content: "2025 六角學院體驗營 - 每日任務打卡追蹤",
        },
        {
          property: "og:title",
          content: "2025 六角學院體驗營 - 每日任務打卡追蹤",
        },
        {
          property: "og:description",
          content: "2025 六角學院體驗營 - 每日任務打卡追蹤",
        },
      ],
    },
  },
  css: ["@/assets/stylesheets/all.scss"],
  vite: {
    define: {
      "process.env": process.env,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "bootstrap/scss/functions"; 
          @import "@/assets/stylesheets/scss/utils/variables";
          @import "@/assets/stylesheets/scss/utils/mixin";`,
        },
      },
    },
  },
  plugins: ["~/plugins/chart.js", "~/plugins/bootstrap.client.js"],
});
