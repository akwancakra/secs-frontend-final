import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BannerMedium, NilaiDetail } from 'src/components'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Detail = () => {
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    document.title = 'Detil Nilai | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const banner = { title: 'Detil Nilai', text: 'Berikut ini adalah detil nilai.' }
  const nilai = {
    id: 1,
    jadwal: {
      ruangan: 'RPL 1',
      tanggal: '2022-07-21 00:00:00.000',
      dosen: { nama: 'Prof. H. Shiba', matpel: { nama: 'Matematika', abbr: 'MTK' } },
    },
    nama: 'Akwan Cakra Tajimlela',
    nilai: 92,
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div>
        <Link
          to="/nilai/main"
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
        <NilaiDetail nilai={nilai} auth={auth.account.role} />
      </div>
    </div>
  )
}

export default Detail
