import { MATA_KULIAH, DATA_MAHASISWA } from '@/lib/data/dummy'

export default function DosenDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Dosen</h1>
        <p className="text-gray-500 text-sm mt-1">Data akademik mahasiswa dan mata kuliah.</p>
      </div>

      {/* Daftar Mahasiswa */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Daftar Mahasiswa</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">No</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">NIM</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Nama</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Semester</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Dosen PA</th>
              </tr>
            </thead>
            <tbody>
              {DATA_MAHASISWA.map((mhs, i) => (
                <tr key={mhs.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-mono font-medium text-[#1e3a5f]">{mhs.nim}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{mhs.nama}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      Sem {mhs.semester}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{mhs.dosenPa}</td>
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
