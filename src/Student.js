/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}

  constructor(id, name, studentClass) {
    // Implementasi constructor di sini
    if (!id || !name || !studentClass) {
      throw new Error('ID, Nama, dan Kelas harus diisi');
    }
    this._id = id;
    this._name = name;
    this._class = studentClass;
    this._grades = {};
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    // Implementasi method di sini
    if (typeof score !== 'number' || score < 0 || score > 100) {
      throw new Error('Nilai harus berupa angka antara 0-100');
    }
    this._grades[subject] = score;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    // Implementasi method di sini
    const scores = Object.values(this._grades);
    if (scores.lenght === 0) return 0;
    const total = scores.reduce((sum, val) => sum + val, 0);
    return parseFloat((total / scores.length).toFixed(2));
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    // Implementasi method di sini
    return this.getAverage() >= 75 ? 'Lulus' : 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    // Implementasi method di sini
    console.log(`ID: ${this._id}`);
    console.log(`Nama: ${this._name}`);
    console.log(`Kelas: ${this._class}`);
    console.log('Mata Pelajaran');
    for (const [subject, score] of Object.entries(this._grades)) {
      console.log(` - ${subject}: ${score}`);
    }
    console.log(`Rata-rata: ${this.getAverage()}`);
    console.log(`Status: ${this.getGradeStatus()}`);
    console.log('------------------------');
  }

  getId() {
    return this._id;
  }

  update(data) {
    if (data.name) this._name = data.name;
    if (data.className) this._class = data.className;
  }
}

export default Student;
