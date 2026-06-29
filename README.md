# 🎀 Pinky Tracker - Habit Tracker App 🚀

**Pinky Tracker** adalah aplikasi pelacak kebiasaan harian (*habit tracker*) berbasis mobile yang dibangun menggunakan **React Native** dan **Expo**. Aplikasi ini dirancang dengan antarmuka bertema *pink pastel & berry violet* yang estetik dan ramah pengguna, serta dilengkapi dengan sistem penyimpanan lokal yang tangguh.

Aplikasi ini memenuhi seluruh kriteria penugasan, mulai dari operasi CRUD dasar, manajemen state, hingga fitur-fitur lanjutan yang mendukung portofolio profesional.

---

## 🌟 Daftar Fitur (Sesuai Kriteria Tugas)

### 🟢 Level 1 — Fitur Wajib (Core)
- [x] **CREATE**: Menambah kebiasaan baru lewat input teks lengkap dengan validasi (menolak input kosong).
- [x] **READ**: Memuat data secara otomatis dari penyimpanan lokal saat pertama kali aplikasi dibuka (`useEffect` + `JSON.parse`).
- [x] **DELETE**: Menghapus item kebiasaan tertentu dan menyinkronkannya kembali ke storage.
- [x] **Persistensi AsyncStorage**: Menggunakan `JSON.stringify` untuk mengunci data secara lokal di HP setiap kali terjadi perubahan.
- [x] **FlatList**: Menampilkan performa list yang efisien dengan penanganan `keyExtractor`.
- [x] **Empty State**: Menampilkan pesan grafis informatif yang lucu saat daftar kebiasaan masih kosong.

### 🟡 Level 2 — Fitur Pengembangan (Pilihan Yang Diimplementasikan)
- [x] **✏️ UPDATE / Edit (Toggle Selesai)**: Mengetuk item kebiasaan akan mencoret teks dan otomatis menambahkan atau mengurangi jumlah *Streak* (`🔥`).
- [x] **🌙 Dark Mode Tersimpan**: Fitur ganti tema (pindah ke mode *Berry Dark*) yang status temanya disimpan pada *key* terpisah di `AsyncStorage`.
- [x] **🔎 Search / Filter**: Kolom pencarian dinamis untuk menyaring kebiasaan di dalam memori secara *real-time*.
- [x] **🗑️ Konfirmasi Hapus**: Memunculkan `Alert` konfirmasi sistem bawaan sebelum benar-benar menghapus data agar aman bagi pengguna.

### 🔴 Level 3 — Tantangan Bonus (Opsional)
- [x] **🏷️ Kategori / Tag**: Pengelompokan kebiasaan berdasarkan label (Kesehatan 🌸, Produktivitas ✨, Belajar 📚).
- [x] **📅 Timestamp**: Mencatat dan menampilkan tanggal pembuatan item secara otomatis berformat lokal Indonesia (`id-ID`).

---

## 📸 Dokumentasi / Screenshots

### Tampilan Utama, Bukti Persistensi & Fitur Level 2
| Sebelum Mengisi Data | Sesudah Mengisi Data | Mode Tema Berry Dark |
| :---: | :---: | :---: |
| <img src="WhatsApp Image 2026-06-29 at 19.58.37 (1).jpeg" width="250" /> | <img src="WhatsApp Image 2026-06-29 at 19.58.37 (2).jpeg" width="250" /> | <img src="WhatsApp Image 2026-06-29 at 19.58.37.jpeg" width="250" /> |

---

## 🛠️ Tech Stack yang Digunakan

- **Framework:** React Native (Expo)
- **Language:** JavaScript (ES6+)
- **Data Persistence:** AsyncStorage API
- **UI & Styling:** StyleSheet (React Native Native Component)

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Jika ingin menguji proyek ini di komputer lokal, ikuti langkah berikut:

1. **Clone Repositori Ini:**
   ```bash
   git clone [https://github.com/jeviens777/Pinky-Tracker.git](https://github.com/jeviens777/Pinky-Tracker.git)
