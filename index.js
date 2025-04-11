const express = require('express');

// Nếu bạn dùng Node.js < 18 thì dùng node-fetch
let fetch;
try {
  fetch = require('node-fetch');
} catch {
  fetch = global.fetch;
}

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint chính để truy xuất dữ liệu từ API gốc
app.get('/fltt.js', async (req, res) => {
  const { key, username } = req.query;

  if (!key || !username) {
    return res.status(400).json({
      success: false,
      message: 'Thiếu key hoặc username!',
    });
  }

  try {
    const apiRes = await fetch(`https://anhcode.click/anhcode/api/fltt.php?key=${encodeURIComponent(key)}&username=${encodeURIComponent(username)}`);
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    console.error('Lỗi fetch:', err);
    res.status(500).json({
      success: false,
      message: 'Lỗi kết nối đến API!',
    });
  }
});

// Trang chính báo trạng thái API
app.get('/', (req, res) => {
  res.send(`
    <h2>API đang hoạt động</h2>
    <p>Truy cập <code>/fltt.js?key=YOUR_KEY&username=USERNAME</code> để sử dụng API.</p>
  `);
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});
