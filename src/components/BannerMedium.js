/* eslint-disable react/prop-types */
import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const BannerMedium = ({ data }) => {
  AOS.init()
  AOS.refresh()

  return (
    <div
      className="banner-medium text-white p-3 rounded-15 position-relative overflow-hidden"
      style={{ backgroundColor: 'var(--purple-dark)' }}
      data-aos="fade-up"
      data-aos-easing="ease-in-sine"
      data-aos-duration="300"
    >
      <div className="my-4 position-relative" style={{ zIndex: 10 }}>
        <h2 className="fw-bold mb-0">{data.title}</h2>
        <p className="mb-0">{data.text}</p>
      </div>
      <div className="d-flex position-absolute" style={{ right: '30px', top: '45px' }}>
        <div
          className="square-left me-2"
          style={{
            width: '230px',
            height: '50px',
            backgroundColor: 'var(--purple-main)',
            borderRadius: '50px 0 50px 0',
          }}
        />
        <div
          className="dot me-2"
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'var(--purple-main)',
            borderRadius: '100%',
          }}
        />
        <div
          className="dot"
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'var(--purple-main)',
            borderRadius: '100%',
          }}
        />
      </div>
    </div>
  )
}

export default BannerMedium
