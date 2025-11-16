/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 *
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */
import fs from 'fs'; // Untuk membaca dan menulis file
import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Save Data
const DATA_FILE = './data/students.json';

function saveData() {
  const raw = manager.getAllStudents().map((s) => ({
    id: s._id,
    name: s._name,
    class: s._class,
    grades: s._grades,
  }));
  fs.writeFileSync(DATA_FILE, JSON.stringify(raw, null, 2));
}

// Load Data
function loadData() {
  if (!fs.existsSync(DATA_FILE)) return;
  const raw = JSON.parse(fs.readFileSync(DATA_FILE));
  raw.forEach((data) => {
    const student = new Student(data.id, data.name, data.class);
    for (const [subject, score] of Object.entries(data.grades)) {
      student.addGrade(subject, score);
    }
    manager.addStudent(student);
  });
}

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Siswa Baru ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ');
  const name = readlineSync.question('Masukkan nama siswa: ');
  const studentClass = readlineSync.question('Masukkan kelas siswa: ');
  try {
    const student = new Student(id, name, studentClass);
    const success = manager.addStudent(student);
    if (success) {
      console.log('✅ Siswa berhasil ditambahkan');
    } else {
      console.log('❌ ID sudah digunakan.');
    }
  } catch (error) {
    console.log(`❌ Terjadi kesalahan:', ${error.message}`);
  }
  saveData(); // menyimpan data setelah menambahkan siswa
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  // Implementasi di sini
  console.log('\n--- Daftar Semua Siswa ---');
  // TODO: Lengkapi implementasi
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  // Implementasi di sini
  console.log('\n--- Cari Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ');
  const student = manager.findStudent(id);
  if (student) {
    student.displayInfo();
  } else {
    console.log('❌ Siswa tidak ditemukan.');
  }
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  // Implementasi di sini
  console.log('\n--- Update Data Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ');
  const student = manager.findStudent(id);
  if (!student) {
    console.log('❌ Siswa tidak ditemukan.');
    return;
  }

  student.displayInfo();
  const name = readlineSync.question(
    'Masukkan nama baru (kosongkan jika tidak diubah): '
  );
  const studentClass = readlineSync.question(
    'Masukkan kelas baru (kosongkan jika tidak diubah): '
  );

  const success = manager.updateStudent(id, { name, className: studentClass });
  if (success) {
    console.log('✅ Data siswa berhasil diperbarui');
  } else {
    console.log('❌ Gagal memperbarui data.');
  }
  saveData(); // menyimpan data setelah update
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  // Implementasi di sini
  console.log('\n--- Hapus Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ');
  const confirm = readlineSync.question(
    'Apakah Anda yakin ingin menghapus siswa? (y/n): '
  );
  if (confirm.toLowerCase() === 'y') {
    const success = manager.removeStudent(id);
    if (success) {
      console.log('✅ Siswa berhasil dihapus');
    } else {
      console.log('❌ Siswa tidak ditemukan.');
    }
  } else {
    console.log('❌ Penghapusan dibatalkan.');
  }
  saveData(); // menyimpan data setelah menghapus
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Nilai Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ');
  const student = manager.findStudent(id);
  if (!student) {
    console.log('❌ Siswa tidak ditemukan.');
    return;
  }

  student.displayInfo();
  const subject = readlineSync.question('Masukkan mata pelajaran: ');
  const score = parseFloat(readlineSync.question('Masukkan nilai (0-100): '));

  try {
    student.addGrade(subject, score);
    console.log('✅ Nilai berhasil ditambahkan');
  } catch (error) {
    console.log(`❌ Terjadi kesalahan: ${error.message}`);
  }
  saveData(); // menyimpan data setelah menambahkan nilai
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  // Implementasi di sini
  console.log('\n--- Top 3 Siswa ---');
  // TODO: Lengkapi implementasi
  const topStudents = manager.getTopStudents(3);
  if (topStudents.length === 0) {
    console.log('❌ Tidak ada data.');
    return;
  }
  topStudents.forEach((s) => s.displayInfo());
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  loadData(); //Untuk Load data yang pernah dibuat

  // TODO: Implementasikan loop utama program
  let running = true;

  while (running) {
    // Tampilkan menu
    // Baca pilihan user
    // Jalankan action sesuai pilihan
    // TODO: Lengkapi implementasi
    // Hint: gunakan switch-case untuk handle berbagai pilihan
    displayMenu();
    const choice = readlineSync.question('Pilih menu (1-8): ');
    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('❌ Pilihan tidak valid.');
    }
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
