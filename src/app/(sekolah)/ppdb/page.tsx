import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ArrowRightIcon } from '@/components/sekolah/Icons'
import { Reveal } from '@/components/sekolah/Interactive'
import { getPpdb, getFaq } from '@/utilities/sekolahData'

export const metadata: Metadata = { title: 'Informasi PPDB' }

export default async function PpdbPage() {
  const [ppdb, faq] = await Promise.all([getPpdb(), getFaq('ppdb')])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Informasi PPDB</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / PPDB
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Tahun Ajaran {ppdb?.academicYear ?? '2026/2027'}</span>
            <h2>{ppdb?.bannerTitle ?? 'Penerimaan Peserta Didik Baru'}</h2>
            <p>{ppdb?.bannerDescription ?? ''}</p>
          </Reveal>

          <div className="ppdb-info-grid">
            {ppdb?.steps?.length ? (
              <Reveal className="ppdb-info-card">
                <h3>Alur Pendaftaran</h3>
                <ol>
                  {ppdb.steps.map((step, index) => (
                    <li key={`${step.title}-${index}`}>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ) : null}

            {ppdb?.timeline?.length ? (
              <Reveal className="ppdb-info-card">
                <h3>Jadwal PPDB</h3>
                <ul>
                  {ppdb.timeline.map((item, index) => (
                    <li key={`${item.title}-${index}`}>
                      <strong>{item.date} — {item.title}</strong>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {ppdb?.requirements?.length ? (
              <Reveal className="ppdb-info-card">
                <h3>Persyaratan</h3>
                <ul>
                  {ppdb.requirements.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
                </ul>
              </Reveal>
            ) : null}
          </div>

          {faq.length > 0 && (
            <section className="section" aria-labelledby="ppdb-faq-title">
              <div className="container">
                <div className="section-head"><h2 id="ppdb-faq-title">Pertanyaan Seputar PPDB</h2></div>
                <div className="accordion reveal-group">
                  {faq.map((item, index) => (
                    <details className="accordion-item" key={`${item.question}-${index}`}>
                      <summary className="accordion-head">{item.question}</summary>
                      <div className="accordion-body"><p>{item.answer}</p></div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}

          <div className="center" style={{ marginTop: 40 }}>
            {ppdb?.registrationFormUrl && (
              <a
                className="btn btn-outline-navy btn-lg"
                href={ppdb.registrationFormUrl}
                rel="noopener noreferrer"
                target="_blank"
                download
              >
                Unduh Formulir Pendaftaran
              </a>
            )}
            <a
              className="btn btn-gold btn-lg"
              href={ppdb?.officialUrl ?? 'https://sd.spmblampung.com'}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buka Situs Resmi PPDB <ArrowRightIcon size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
