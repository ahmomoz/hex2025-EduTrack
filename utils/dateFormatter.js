// YYYY-MM-DD 轉 YYYY/MM/DD
// 例如: 2025-04-28 轉 2025/04/28"
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
