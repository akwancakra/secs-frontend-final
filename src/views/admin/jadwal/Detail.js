import { CAlert } from '@coreui/react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BannerMedium, JadwalDetail } from 'src/components'
import JadwalSiswa from 'src/components/jadwal/JadwalSiswa'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Detail = () => {
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)

  const banner = { title: 'Detil Jadwal', text: '' }
  const jadwal = {
    id: 1,
    ruangan: 'RPL 1',
    tanggal: '2022-07-21 00:00:00.000',
    dosen: { nama: 'Prof. H. Naimin', matpel: { id: 1, nama: 'Matematika' } },
  }

  const siswas = [
    {
      id: 1,
      nama: 'Akwan Cakra Tajimalela',
      nis: 192010382,
    },
    {
      id: 2,
      nama: 'Dandy Alyahmin',
      nis: 192010383,
    },
  ]

  useEffect(() => {
    document.title = 'Detail Jadwal | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  return (
    <div>
      <BannerMedium data={banner} />

      <div>
        <Link
          to="/jadwal/main"
          className="btn btn-soft-purple rounded-15 fw-bold d-flex align-items-center mt-3"
          style={{ width: 'fit-content' }}
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          <i className="bx bxs-chevron-left"></i> Kembali
        </Link>
      </div>

      <div className="mb-4 mt-1">
        <JadwalDetail jadwal={jadwal} auth={auth.account.role} />
      </div>

      <h2 className="mb-0 fw-bold mt-4">Siswa</h2>
      <div className="row">
        {siswas ? (
          siswas.map((siswa, index) => (
            // eslint-disable-next-line react/jsx-key
            <JadwalSiswa siswa={siswa} index={index} key={siswa.id} />
          ))
        ) : (
          <CAlert color="primary">
            Tidak ada data <strong>siswa</strong> untuk ditampilkan.
          </CAlert>
        )}
      </div>
    </div>
  )
}

export default Detail
