# Praktikum: Task Management App (Level 1 dan 2)

<img width="511" height="310" alt="image" src="https://github.com/user-attachments/assets/fa35903e-2afc-46e5-a088-ae83453454c4" />
<img width="513" height="389" alt="image" src="https://github.com/user-attachments/assets/6d9bf494-2065-4f3a-8c27-13c720c3ad06" />

## Refleksi:
**Apa perbedaan antara props, state, dan context?**

- Props adalah data yang dikirim dari Parent ke Child, yang mengalir satu arah dan bersifat read-only.
- State adalah data di dalam komponen yang bisa berubah dan membuat tampilan ikut berubah.
- Context adalah data yang dibagikan ke semua komponen tanpa meneruskan props satu per satu. 

**Kapan kita perlu menggunakan useEffect dibandingkan mengubah state langsung?**
- Ubah state langsung saat ada interaksi pengguna seperti klik tombol atau ketik di input.
- Pake useEffect saat ada proses sinkronisasi dengan sistem di luar React seperti koneksi ke server, ambil data dari API, simpan data otomatis ke localStorage.
