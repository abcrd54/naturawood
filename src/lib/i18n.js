export const translations = {
  id: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      readyStock: 'Ready Stock',
      about: 'Tentang',
      contact: 'Kontak',
      language: 'Bahasa',
    },
    hero: {
      brand: 'Naturawood',
      ctaPrimary: 'Lihat Produk Sold Out',
      ctaSecondary: 'Hubungi Kami',
      slides: [
        {
          id: 'hero-1',
          title: 'Kayu solid premium dengan karakter alami di setiap seratnya.',
          subtitle:
            'Naturawood menghadirkan meja solid, slab siap pilih, dan custom project dengan tampilan yang rapi, hangat, dan premium.',
        },
        {
          id: 'hero-2',
          title: 'Dari slab mentah menjadi karya akhir yang berkelas.',
          subtitle:
            'Lihat bagaimana material pilihan diproses menjadi table top, resin piece, dan kebutuhan interior dengan pendekatan yang detail.',
        },
        {
          id: 'hero-3',
          title: 'Dibuat di Indonesia untuk ruang tinggal, hospitality, dan project statement.',
          subtitle:
            'Cocok untuk rumah, villa, hotel, cafe, maupun project komersial yang membutuhkan karakter kayu yang kuat dan presentasi yang elegan.',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Arsip produk yang sudah terjual.',
      copy:
        'Section ini hanya menampilkan produk dengan status sold out dari database agar pengunjung tetap bisa melihat karakter slab, hasil finishing, dan referensi visualnya.',
      archivedBadge: 'Arsip Sold Out',
      soldOutCategory: 'Produk Sold Out',
      dialogDescription:
        'Produk ini sebelumnya tersedia sebagai ready stock dan kini dipindahkan ke portfolio sebagai arsip visual.',
      dialogLongDescription:
        'Walau sudah tidak tersedia, karakter slab, bentuk akhir, dan kualitas finishing-nya tetap bisa dijadikan referensi untuk pesanan berikutnya.',
      empty: 'Belum ada produk sold out untuk ditampilkan.',
    },
    readyStock: {
      eyebrow: 'Ready Stock',
      title: 'Produk yang masih siap dipilih dan didiskusikan.',
      copy:
        'Hanya produk dengan status ready yang tampil di sini. Anda dapat langsung menghubungi kontak untuk diskusi apakah ingin membeli slab mentah atau sudah finishing / resin.',
      loading: 'Memuat produk...',
      error: 'Produk gagal dimuat. Periksa konfigurasi Supabase dan struktur tabel products.',
      empty: 'Belum ada produk ready untuk ditampilkan.',
      status: 'Ready',
    },
    about: {
      eyebrow: 'Tentang Naturawood',
      title: 'Brand kayu premium yang dibentuk oleh karakter material alami.',
      copy:
        'Naturawood dibangun dari keyakinan bahwa setiap slab memiliki identitas unik. Kami mengkurasi kayu solid dan mengolahnya menjadi meja maupun elemen interior untuk kebutuhan residential, hospitality, dan project.',
      storyTitle: 'Cerita Kami',
      storyCopy:
        'Fokus kami ada pada kejujuran material, proporsi, dan hasil akhir. Bukan sekadar produksi massal, tetapi bagaimana karakter tiap slab ditampilkan dengan presentasi yang tenang, rapi, dan terasa premium.',
      ownerEyebrow: 'Owner',
      ownerTitle: 'Berpengalaman lebih dari 10 tahun di dunia kayu.',
      ownerCopy:
        'Naturawood dipimpin langsung oleh owner yang sudah lama berkecimpung dalam pemilihan slab, proses finishing, aplikasi resin, hingga eksekusi custom project. Pengalaman tersebut membantu setiap produk memiliki perhatian lebih pada serat, proporsi, kekuatan, dan tampilan akhir.',
      ownerBadge: 'Owner-led craftsmanship',
      addressTitle: 'Alamat',
      addressCopy: 'Bawu Batealit Jepara \nJawa Tengah, Indonesia',
      serveTitle: 'Layanan Kami',
      serveCopy:
        'Custom table, ready stock slab, supply untuk kontraktor, project hospitality, dan one-of-a-kind statement pieces.',
      ownerAlt: 'Owner Naturawood',
    },
    orderFlow: {
      eyebrow: 'Alur Pemesanan',
      title: 'Dua alur pemesanan yang sederhana dan jelas.',
      copy:
        'Naturawood melayani ready stock maupun custom project. Alurnya dibuat ringkas agar diskusi material, ukuran, finishing, dan timeline bisa lebih terarah sejak awal.',
      flows: [
        {
          title: 'Ready Stock',
          steps: [
            'Pilih produk yang tersedia di section Ready Stock.',
            'Hubungi kontak Naturawood untuk menanyakan detail ukuran, harga, dan ketersediaan terbaru.',
            'Diskusikan apakah slab akan dibeli mentah atau dilanjutkan ke finishing / resin.',
            'Konfirmasi detail akhir lalu proses pemesanan berjalan sesuai kebutuhan.',
          ],
        },
        {
          title: 'Custom / Project Request',
          steps: [
            'Sampaikan kebutuhan ruang, ukuran, style, dan fungsi produk yang diinginkan.',
            'Tim akan membantu mencarikan slab atau material yang paling sesuai.',
            'Diskusi masuk ke tahap finishing, resin, base table, serta estimasi pengerjaan.',
            'Setelah spesifikasi final disetujui, project masuk ke proses produksi.',
          ],
        },
      ],
    },
    contact: {
      eyebrow: 'Kontak',
      title: 'Mari diskusikan slab yang paling tepat untuk ruang Anda.',
      copy:
        'Untuk ready stock maupun custom project, hubungi Naturawood agar diskusi ukuran, finishing, resin, dan kebutuhan ruang bisa diarahkan dengan lebih tepat.',
      items: [
        { label: 'WhatsApp', value: '+62 812-3456-7890' },
        { label: 'Email', value: 'hello@naturawoodtables.com' },
        { label: 'Instagram', value: '@naturawood.id' },
        { label: 'Workshop', value: 'Jepara, Jawa Tengah, Indonesia' },
      ],
    },
    footer: {
      copyright: '© 2026 Naturawood x DIKANA KARYA.',
    },
    dialog: {
      dimensions: 'Ukuran',
      material: 'Material',
      close: 'Tutup',
      inquire: 'Hubungi untuk diskusi',
    },
    admin: {
      panel: 'Admin Panel',
      signIn: 'Masuk',
      signInHelp: 'Gunakan satu akun admin yang dibuat di Supabase Auth.',
      email: 'Email',
      password: 'Password',
      backToWebsite: 'Kembali ke website',
      manageTitle: 'Kelola produk bilingual',
      manageCopy:
        'Isi nama dan deskripsi singkat dalam Bahasa Indonesia dan English langsung dari dashboard. Status ready akan tampil di Ready Stock, sedangkan sold out otomatis masuk ke section Portfolio.',
      refresh: 'Refresh',
      logout: 'Logout',
      save: 'Simpan data',
      saving: 'Menyimpan...',
      products: 'Produk',
      ready: 'Ready',
      soldOut: 'Sold Out',
      route: 'Route',
      loading: 'Memuat produk...',
      addProduct: 'Tambah produk',
      code: 'Kode',
      titleId: 'Nama produk (ID)',
      titleEn: 'Product name (EN)',
      size: 'Ukuran',
      conditionId: 'Keterangan singkat (ID)',
      conditionEn: 'Short detail (EN)',
      status: 'Status',
      before: 'URL foto before',
      after: 'URL foto after / utama',
      order: 'Urutan',
      delete: 'Hapus',
      statusReady: 'ready',
      statusSoldOut: 'sold_out',
      notices: {
        missingEnv: 'Variabel environment Supabase belum diisi. Buat file .env dari .env.example lalu isi project URL dan anon key.',
        loginSuccess: 'Login berhasil.',
        loggedOut: 'Berhasil logout.',
        deleted: 'Produk berhasil dihapus.',
        updated: 'Produk berhasil diperbarui.',
        refreshed: 'Data berhasil diperbarui.',
        loadFailed: 'Gagal memuat produk.',
        saveFailed: 'Gagal menyimpan data.',
        deleteFailed: 'Gagal menghapus produk.',
        refreshFailed: 'Gagal refresh data.',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      readyStock: 'Ready Stock',
      about: 'About',
      contact: 'Contact',
      language: 'Language',
    },
    hero: {
      brand: 'Naturawood',
      ctaPrimary: 'View Sold Out Products',
      ctaSecondary: 'Contact Us',
      slides: [
        {
          id: 'hero-1',
          title: 'Premium solid wood with natural character in every grain.',
          subtitle:
            'Naturawood presents solid tables, curated slabs, and custom project pieces with a warm, refined, and premium visual language.',
        },
        {
          id: 'hero-2',
          title: 'From raw slab to a finished piece with presence.',
          subtitle:
            'See how selected materials are transformed into table tops, resin pieces, and interior elements through a careful and detailed process.',
        },
        {
          id: 'hero-3',
          title: 'Crafted in Indonesia for living spaces, hospitality, and statement projects.',
          subtitle:
            'Suitable for homes, villas, hotels, cafes, and commercial projects that need strong wood character with an elegant final presentation.',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Archive of sold out products.',
      copy:
        'This section only shows products with sold_out status from the database, so visitors can still explore the slab character, finish quality, and visual references.',
      archivedBadge: 'Sold Out Archive',
      soldOutCategory: 'Sold Out Product',
      dialogDescription:
        'This item was previously available as ready stock and is now shown as part of the visual portfolio archive.',
      dialogLongDescription:
        'Even though it is no longer available, its slab character, final shape, and finish quality can still serve as a useful reference for future orders.',
      empty: 'No sold out products to display yet.',
    },
    readyStock: {
      eyebrow: 'Ready Stock',
      title: 'Products that are currently available to select and discuss.',
      copy:
        'Only products with ready status appear here. You can contact Naturawood directly to discuss whether you want the slab raw or already finished / resin-treated.',
      loading: 'Loading products...',
      error: 'Failed to load products. Please check your Supabase configuration and products table setup.',
      empty: 'No ready products available yet.',
      status: 'Ready',
    },
    about: {
      eyebrow: 'About Naturawood',
      title: 'A premium wood brand shaped by the natural character of each material.',
      copy:
        'Naturawood is built on the belief that every slab has its own identity. We curate solid wood and transform it into tables and interior pieces for residential, hospitality, and project-based needs.',
      storyTitle: 'Our Story',
      storyCopy:
        'We focus on material honesty, proportion, and finish. Rather than chasing uniform mass production, we present the individuality of every slab through a calm, clean, and premium design approach.',
      ownerEyebrow: 'Owner',
      ownerTitle: 'More than 10 years of hands-on experience in the wood industry.',
      ownerCopy:
        'Naturawood is led directly by an owner with long experience in slab selection, finishing, resin application, and custom project execution. That background shapes every product with stronger attention to grain, proportion, durability, and final presentation.',
      ownerBadge: 'Owner-led craftsmanship',
      addressTitle: 'Address',
      addressCopy: 'Bawu, Batealit, Jepara \nCentral Java, Indonesia',
      serveTitle: 'What We Serve',
      serveCopy:
        'Custom tables, ready stock slabs, contractor supply, hospitality projects, and one-of-a-kind statement pieces.',
      ownerAlt: 'Naturawood owner',
    },
    orderFlow: {
      eyebrow: 'Order Flow',
      title: 'Two straightforward order paths for different needs.',
      copy:
        'Naturawood serves both ready stock purchases and custom projects. The process stays simple so discussions about material, dimensions, finish, and timeline can start clearly from the beginning.',
      flows: [
        {
          title: 'Ready Stock',
          steps: [
            'Choose the available product shown in the Ready Stock section.',
            'Contact Naturawood to confirm dimensions, pricing, and current availability.',
            'Discuss whether you want the slab in raw condition or continued into finishing / resin.',
            'Confirm the final details and proceed with the order based on your needs.',
          ],
        },
        {
          title: 'Custom / Project Request',
          steps: [
            'Share the space requirement, dimensions, style, and intended function of the piece.',
            'The team will help curate the most suitable slab or material.',
            'The discussion continues into finishing, resin, table base, and production timeline.',
            'Once the final specification is approved, the project moves into production.',
          ],
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s discuss the right slab for your space.',
      copy:
        'For ready stock and custom projects alike, contact Naturawood so dimensions, finish, resin, and space requirements can be discussed more precisely.',
      items: [
        { label: 'WhatsApp', value: '+62 812-3456-7890' },
        { label: 'Email', value: 'hello@naturawoodtables.com' },
        { label: 'Instagram', value: '@naturawood.id' },
        { label: 'Workshop', value: 'Jepara, Central Java, Indonesia' },
      ],
    },
    footer: {
      copyright: '© 2026 Naturawood. All rights reserved.',
    },
    dialog: {
      dimensions: 'Dimensions',
      material: 'Material',
      close: 'Close',
      inquire: 'Discuss this piece',
    },
    admin: {
      panel: 'Admin Panel',
      signIn: 'Sign in',
      signInHelp: 'Use the single admin account created in Supabase Auth.',
      email: 'Email',
      password: 'Password',
      backToWebsite: 'Back to website',
      manageTitle: 'Manage bilingual products',
      manageCopy:
        'Fill in Indonesian and English product names and short details directly from the dashboard. Ready items appear in Ready Stock, while sold out items move automatically into Portfolio.',
      refresh: 'Refresh',
      logout: 'Logout',
      save: 'Save data',
      saving: 'Saving...',
      products: 'Products',
      ready: 'Ready',
      soldOut: 'Sold Out',
      route: 'Route',
      loading: 'Loading products...',
      addProduct: 'Add product',
      code: 'Code',
      titleId: 'Product name (ID)',
      titleEn: 'Product name (EN)',
      size: 'Dimensions',
      conditionId: 'Short detail (ID)',
      conditionEn: 'Short detail (EN)',
      status: 'Status',
      before: 'Before image URL',
      after: 'After / main image URL',
      order: 'Order',
      delete: 'Delete',
      statusReady: 'ready',
      statusSoldOut: 'sold_out',
      notices: {
        missingEnv: 'Supabase environment variables are missing. Create a .env file from .env.example and fill in your project URL and anon key.',
        loginSuccess: 'Login successful.',
        loggedOut: 'Logged out.',
        deleted: 'Product deleted successfully.',
        updated: 'Products updated successfully.',
        refreshed: 'Data refreshed.',
        loadFailed: 'Failed to load products.',
        saveFailed: 'Failed to save data.',
        deleteFailed: 'Failed to delete product.',
        refreshFailed: 'Failed to refresh data.',
      },
    },
  },
}
