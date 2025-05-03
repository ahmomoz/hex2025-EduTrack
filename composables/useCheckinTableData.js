export function useCheckinTableData(users, stats, startDate = '2025-04-28') {
  const baseDate = new Date(startDate);

  // 用 stats 找出最晚的打卡日期
  const latestDate = stats.reduce((latest, stat) => {
    const d = new Date(stat.date);
    return d > latest ? d : latest;
  }, baseDate);

  // 根據最晚日期計算 Day 數
  const dayCount = Math.floor((latestDate - baseDate) / (1000 * 60 * 60 * 24)) + 1;

  // 產出 dateList
  const dateList = Array.from({ length: dayCount }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  // 組合每位使用者的出勤資料（布林陣列）
  const processedUsers = users.map(user => {
    const days = dateList.map(date => !!user.presence?.[date]);
    return {
      author_id: user.author_id,
      username: user.username,
      days
    };
  });

  return {
    dateList,
    processedUsers
  };
}
