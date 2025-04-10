const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/fltt.js', async (req, res) => {
  const { key, username } = req.query;

  if (!key || !username) {
    return res.json({ success: false, message: 'Thiếu key hoặc username!' });
  }

  try {
    const apiRes = await fetch(`https://anhcode.click/anhcode/api/fltt.php?key=${key}&username=${username}`);
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    res.json({ success: false, message: 'Lỗi kết nối đến API!' });
  }
});

app.get('/', (req, res) => {
  res.send('API đang hoạt động. Sử dụng /fltt.js?key=...&username=...');
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});
