import { MATA_KULIAH, DATA_DOSEN } from '@/lib/data/dummy'

export default function MahasiswaDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Mahasiswa</h1>
        <p className="text-gray-500 text-sm mt-1">Informasi akademik tersedia di bawah ini.</p>
      </div>

      {/* Daftar Dosen */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Daftar Dosen</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">No</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">NIP</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Nama</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {DATA_DOSEN.map((dosen, i) => (
                <tr key={dosen.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-mono text-gray-700">{dosen.nip}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{dosen.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{dosen.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Daftar Mata Kuliah */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Daftar Mata Kuliah</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">No</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Kode</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Nama Mata Kuliah</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">SKS</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Semester</th>
              </tr>
            </thead>
            <tbody>
              {MATA_KULIAH.map((mk, i) => (
                <tr key={mk.kode} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-mono font-medium text-[#1e3a5f]">{mk.kode}</td>
                  <td className="px-4 py-3 text-gray-900">{mk.nama}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {mk.sks} SKS
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">Semester {mk.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
