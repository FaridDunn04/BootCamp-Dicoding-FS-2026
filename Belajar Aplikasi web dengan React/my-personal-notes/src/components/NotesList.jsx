import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list' }) {
  // 1) Cek dulu apakah notes benar-benar ada dan memiliki isi.
  // Jika bukan array atau kosong, kita tampilkan pesan "Tidak Ada Catatan".
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak Ada Catatan
        </p>
      </div>
    );
  }

  // 2) Siapkan objek kosong untuk menampung hasil pengelompokan.
  // Bentuk akhirnya: { "April 2026": [note1, note2], "Maret 2026": [note3] }
  const groupedNotes = {};

  // 3) Loop semua catatan satu per satu.
  notes.forEach((note) => {
    // 4) Ubah createdAt menjadi label bulan-tahun (contoh: "April 2026").
    const groupLabel = new Date(note.createdAt).toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    });

    // 5) Jika grup bulan-tahun belum ada, buat array kosong terlebih dahulu.
    if (!groupedNotes[groupLabel]) {
      groupedNotes[groupLabel] = [];
    }

    // 6) Masukkan catatan ke grup bulan-tahun yang sesuai.
    groupedNotes[groupLabel].push(note);
  });

  // 7) Ambil daftar nama grup dari object groupedNotes.
  const groupLabels = Object.keys(groupedNotes);

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {/* 8) Render setiap grup bulan-tahun menjadi satu section. */}
      {groupLabels.map((label) => (
        <section className="notes-group" data-testid={`${dataTestId}-group`} key={label}>
          {/* 9) Tampilkan judul grup, misalnya "April 2026". */}
          <div className="notes-group__header">
            <h2 className="notes-group__title" data-testid={`${dataTestId}-group-title`}>
              {label}
            </h2>
            <span className="notes-group__count">
              {groupedNotes[label].length} catatan
            </span>
          </div>
          <div className="notes-group__items" data-testid={`${dataTestId}-group-content`}>
            {/* 10) Render semua catatan yang ada di dalam grup tersebut. */}
            {groupedNotes[label].map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
      



export default NotesList;
