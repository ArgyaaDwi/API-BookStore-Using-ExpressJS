const express = require('express');
const pool = require('./db'); // Import file db.js yang telah Anda buat sebelumnya
const app = express();
const port = 3030;

app.use(express.json());

// Read All Books
app.get('/books', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data buku' });
  }
});

// Get Book By ID
app.get('/books/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data buku' });
  }
});

// Add Book
app.post('/books/add', async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Judul dan penulis harus diisi' });
  }
  try {
    const { rows } = await pool.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [title, author]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan buku' });
  }
});

// Edit Book by ID
app.put('/books/edit/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  try {
    const { rowCount } = await pool.query('UPDATE books SET title = $1, author = $2 WHERE id = $3', [title, author, bookId]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json({ message: 'Buku berhasil diperbarui' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui buku' });
  }
});

// Delete Book by ID
app.delete('/books/delete/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const { rowCount } = await pool.query('DELETE FROM books WHERE id = $1', [bookId]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus buku' });
  }
});

// Home
app.get('/', (req, res) => {
  res.send('Selamat datang di toko buku API');
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
