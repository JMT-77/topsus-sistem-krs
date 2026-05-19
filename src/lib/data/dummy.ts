// Data dummy hardcoded — tidak ada koneksi DB

export type MataKuliah = {
  kode: string
  nama: string
  sks: number
  semester: number
}

export type DataDosen = {
  id: string
  nip: string
  nama: string
  email: string
  mataKuliah: string[]
}

export type DataMahasiswa = {
  id: string
  nim: string
  nama: string
  email: string
  semester: number
  dosenPa: string
}

export const MATA_KULIAH: MataKuliah[] = [
  { kode: 'TI101', nama: 'Algoritma dan Pemrograman', sks: 3, semester: 1 },
  { kode: 'TI102', nama: 'Matematika Diskrit', sks: 3, semester: 1 },
  { kode: 'TI103', nama: 'Basis Data', sks: 3, semester: 2 },
  { kode: 'TI104', nama: 'Pemrograman Web', sks: 3, semester: 3 },
  { kode: 'TI105', nama: 'Jaringan Komputer', sks: 3, semester: 3 },
  { kode: 'TI106', nama: 'Rekayasa Perangkat Lunak', sks: 3, semester: 4 },
  { kode: 'TI107', nama: 'Kecerdasan Buatan', sks: 3, semester: 5 },
  { kode: 'TI108', nama: 'Keamanan Informasi', sks: 3, semester: 6 },
]

export const DATA_DOSEN: DataDosen[] = [
  {
    id: 'd-001',
    nip: '196801011995121001',
    nama: 'Dr. I Made Sukarsa, S.T., M.T.',
    email: 'sukarsa@unud.ac.id',
    mataKuliah: ['TI103', 'TI106'],
  },
  {
    id: 'd-002',
    nip: '197203152000031002',
    nama: 'Dr. I Ketut Gede Suhartana, S.Kom., M.Kom.',
    email: 'suhartana@unud.ac.id',
    mataKuliah: ['TI101', 'TI107'],
  },
  {
    id: 'd-003',
    nip: '198005102008121003',
    nama: 'I Putu Agung Bayupati, S.T., M.T.',
    email: 'bayupati@unud.ac.id',
    mataKuliah: ['TI104', 'TI105'],
  },
  {
    id: 'd-004',
    nip: '197811222006042004',
    nama: 'Ni Kadek Dwi Rusjayanthi, S.Kom., M.Kom.',
    email: 'rusjayanthi@unud.ac.id',
    mataKuliah: ['TI102', 'TI108'],
  },
]

export const DATA_MAHASISWA: DataMahasiswa[] = [
  {
    id: 'm-001',
    nim: '2305551001',
    nama: 'I Gede Arya Pratama',
    email: 'arya.pratama@student.unud.ac.id',
    semester: 3,
    dosenPa: 'Dr. I Made Sukarsa, S.T., M.T.',
  },
  {
    id: 'm-002',
    nim: '2305551023',
    nama: 'Ni Luh Putu Sari Dewi',
    email: 'sari.dewi@student.unud.ac.id',
    semester: 3,
    dosenPa: 'Dr. I Made Sukarsa, S.T., M.T.',
  },
  {
    id: 'm-003',
    nim: '2305551045',
    nama: 'I Wayan Bagas Saputra',
    email: 'bagas.saputra@student.unud.ac.id',
    semester: 5,
    dosenPa: 'Dr. I Ketut Gede Suhartana, S.Kom., M.Kom.',
  },
  {
    id: 'm-004',
    nim: '2305551067',
    nama: 'Ni Made Ayu Lestari',
    email: 'ayu.lestari@student.unud.ac.id',
    semester: 5,
    dosenPa: 'I Putu Agung Bayupati, S.T., M.T.',
  },
  {
    id: 'm-005',
    nim: '2305551089',
    nama: 'I Putu Dika Mahendra',
    email: 'dika.mahendra@student.unud.ac.id',
    semester: 7,
    dosenPa: 'Ni Kadek Dwi Rusjayanthi, S.Kom., M.Kom.',
  },
]
