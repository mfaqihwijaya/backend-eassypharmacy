'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Medicines', [
      {
        name: "Paracetamol",
        description: "Paracetamol adalah obat analgesik (pereda nyeri) dan antipiretik (penurun demam) yang umum digunakan untuk mengobati nyeri ringan hingga sedang dan mengurangi demam.",
        indication: "Untuk meredakan nyeri ringan hingga sedang dan mengurangi demam.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap paracetamol atau gangguan hati yang parah.",
        composition: "Tiap tablet mengandung 500 mg paracetamol.",
        dose: "Dewasa: 500 mg hingga 1000 mg setiap 4-6 jam, tidak melebihi 4000 mg per hari. Anak-anak: 10-15 mg/kg setiap 4-6 jam, tidak melebihi 60 mg/kg per hari.",
        usage: "Diminum dengan air, dapat dikonsumsi dengan atau tanpa makanan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk reaksi alergi (ruam, gatal, bengkak), kerusakan hati (dengan penggunaan jangka panjang atau overdosis), dan gangguan pencernaan.",
        categoryId: 2,
        price: 10000,
        stock: 5,
        image: "https://media.istockphoto.com/id/1217118257/id/foto/wanita-memegang-kotak-tablet-parasetamol-1000mg-di-tangannya-dan-segelas-air.webp?s=612x612&w=is&k=20&c=ES38si9xIzj6L-4fyjFqpxenhEyH9lextXaBw6mr-eI=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ibuprofen",
        description: "Ibuprofen adalah obat antiinflamasi nonsteroid (NSAID) yang digunakan untuk meredakan nyeri, mengurangi demam, dan mengurangi peradangan.",
        indication: "Untuk meredakan nyeri ringan hingga sedang, mengurangi demam, dan mengatasi peradangan pada kondisi seperti artritis, sakit kepala, sakit gigi, nyeri otot, dan nyeri haid.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap ibuprofen, asma yang dipicu oleh NSAID, gangguan ginjal atau hati yang parah, dan ulkus lambung atau duodenum.",
        composition: "Tiap tablet mengandung 200 mg atau 400 mg ibuprofen.",
        dose: "Dewasa: 200-400 mg setiap 4-6 jam sesuai kebutuhan, tidak melebihi 1200 mg per hari tanpa pengawasan medis. Anak-anak: 10 mg/kg setiap 6-8 jam, tidak melebihi 40 mg/kg per hari.",
        usage: "Diminum dengan air, sebaiknya setelah makan untuk mengurangi risiko gangguan lambung.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk gangguan pencernaan, mual, muntah, sakit perut, diare, sembelit, sakit kepala, pusing, reaksi alergi (ruam, gatal, pembengkakan), dan risiko peningkatan perdarahan.",
        categoryId: 1,
        price: 12000,
        stock: 8,
        image: "https://media.istockphoto.com/id/1163798570/photo/ibuprofen-medication.webp?s=612x612&w=is&k=20&c=QKM0z6zd_EbsVUA6u8PWaB2DGIsAnUiLhieCixtBW90=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Aspirin",
        description: "Aspirin adalah obat analgesik (pereda nyeri), antipiretik (penurun demam), dan antiinflamasi (pengurang peradangan) yang umum digunakan.",
        indication: "Untuk meredakan nyeri ringan hingga sedang, mengurangi demam, mengatasi peradangan pada kondisi seperti artritis, dan mencegah penyakit jantung dan stroke pada dosis rendah.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap aspirin, ulkus lambung atau duodenum, gangguan pembekuan darah, dan anak-anak dengan infeksi virus seperti flu.",
        composition: "Tiap tablet mengandung 300 mg atau 500 mg aspirin.",
        dose: "Dosis tergantung pada indikasi dan kondisi pasien. Untuk penggunaan jangka panjang, dosis rendah dapat diberikan untuk pencegahan penyakit jantung.",
        usage: "Diminum dengan air, sebaiknya setelah makan untuk mengurangi risiko gangguan lambung.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk gangguan pencernaan, iritasi lambung, dan risiko pendarahan.",
        categoryId: 7,
        price: 8000,
        stock: 10,
        image: "https://media.istockphoto.com/id/458563393/photo/aspirin-bottle-with-tablets-spilling-out.webp?s=612x612&w=is&k=20&c=r_k8dH2r0vQ24XMKFrRMxMz_tvQkPrS3d3MgCtaK8IU=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ciprofloxacin",
        description: "Ciprofloxacin adalah antibiotik golongan fluorokuinolon yang digunakan untuk mengobati infeksi bakteri, termasuk infeksi saluran kemih, kulit, dan paru-paru.",
        indication: "Untuk mengobati infeksi bakteri yang disebabkan oleh bakteri yang peka terhadap ciprofloxacin.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap ciprofloxacin atau antibiotik golongan fluorokuinolon lainnya.",
        composition: "Tiap tablet mengandung 250 mg, 500 mg, atau 750 mg ciprofloxacin.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan infeksi. Biasanya diberikan 250 mg hingga 750 mg setiap 12 jam.",
        usage: "Dikonsumsi dengan air, sebaiknya setelah makan untuk mengurangi risiko gangguan lambung.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk gangguan pencernaan, sakit perut, mual, muntah, dan risiko pendarahan pada lambung.",
        categoryId: 3,
        price: 15000,
        stock: 3,
        image: "https://media.istockphoto.com/id/1164018543/photo/generic-tablets-of-ciprofloxacin-antibiotics.webp?s=612x612&w=is&k=20&c=KSBbNw9e1e_yc3fMhHYiBKF3zITPqXe5v7VOHsIabo4=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Amoxicillin",
        description: "Amoxicillin adalah antibiotik golongan penisilin yang digunakan untuk mengobati berbagai jenis infeksi bakteri, termasuk infeksi saluran pernapasan, telinga, dan infeksi kulit.",
        indication: "Untuk mengobati infeksi bakteri yang disebabkan oleh bakteri yang peka terhadap amoxicillin.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap penisilin atau antibiotik golongan penisilin lainnya.",
        composition: "Tiap tablet mengandung 250 mg atau 500 mg amoxicillin.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan infeksi. Biasanya diberikan 250 mg hingga 500 mg setiap 8 jam.",
        usage: "Dikonsumsi dengan air, sebaiknya sebelum atau sesudah makan untuk mengurangi risiko gangguan lambung.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk gangguan pencernaan, diare, ruam kulit, dan reaksi alergi.",
        categoryId: 5,
        price: 18000,
        stock: 7,
        image: "https://media.istockphoto.com/id/1295333389/photo/amoxicillin.webp?s=612x612&w=is&k=20&c=AfyC_jSSuYHJuhxHkftdhhlF3wUbqR18_dQNMI5kvhI=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Loratadine",
        description: "Loratadine adalah obat antihistamin yang digunakan untuk meredakan gejala alergi, seperti rinitis alergi dan urtikaria.",
        indication: "Untuk meredakan gejala alergi seperti bersin-bersin, hidung tersumbat, mata berair, gatal-gatal pada kulit, dan ruam alergi.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap loratadine atau antihistamin lainnya.",
        composition: "Tiap tablet mengandung 10 mg loratadine.",
        dose: "Dosis untuk dewasa dan anak-anak di atas 12 tahun adalah 10 mg sehari.",
        usage: "Dikonsumsi dengan air, tidak tergantung pada makanan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk mengantuk, pusing, mulut kering, dan gangguan pencernaan.",
        categoryId: 2,
        price: 9000,
        stock: 15,
        image: "https://media.istockphoto.com/id/1343262408/photo/generic-box-of-loratadine-or-allergy-relief-pills-white-background.webp?s=612x612&w=is&k=20&c=n4LNTeTecuDT0X07RQ0efAviSoH_ltfNHYdmi5VwS8I=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Omeprazole",
        description: "Omeprazole adalah obat golongan inhibitor pompa proton (PPI) yang digunakan untuk mengurangi produksi asam lambung.",
        indication: "Untuk mengobati penyakit asam lambung, tukak lambung, dan esofagitis refluks.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap omeprazole atau komponen lain dalam obat ini.",
        composition: "Tiap kapsul mengandung 20 mg atau 40 mg omeprazole.",
        dose: "Dosis tergantung pada kondisi pasien. Biasanya diberikan 20 mg hingga 40 mg sekali sehari selama 4-8 minggu.",
        usage: "Kapsul ditelan utuh dengan air, sebaiknya 30-60 menit sebelum makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk sakit kepala, diare, mual, muntah, dan gangguan pencernaan.",
        categoryId: 4,
        price: 20000,
        stock: 20,
        image: "https://media.istockphoto.com/id/1297469143/photo/packet-of-generic-omeprazole-pills.webp?s=612x612&w=is&k=20&c=F9pg9CyKFxL3FhVbj9ligUfE4n53AP0NYp5KfLGNY_4=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Diazepam",
        description: "Diazepam adalah obat golongan benzodiazepin yang digunakan untuk meredakan kecemasan, mengatasi kejang, dan membantu tidur.",
        indication: "Untuk mengobati kecemasan, kejang, dan masalah tidur.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap diazepam atau benzodiazepin lainnya, serta individu dengan glaukoma sudut tertutup atau sleep apnea.",
        composition: "Tiap tablet mengandung 2 mg, 5 mg, atau 10 mg diazepam.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan kondisi. Biasanya diberikan 2 mg hingga 10 mg setiap 6-12 jam.",
        usage: "Dikonsumsi dengan air, dapat diminum sebelum atau sesudah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk mengantuk, lemah, pusing, dan reaksi alergi.",
        categoryId: 8,
        price: 25000,
        stock: 12,
        image: "https://media.istockphoto.com/id/1295607003/photo/benzodiazepine.webp?s=612x612&w=is&k=20&c=uN-J9Q7mK9ENnZ8zSU2sdXOSIwDeLs2mmzsufhX4GqQ=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Metformin",
        description: "Metformin adalah obat golongan biguanid yang digunakan untuk mengobati diabetes tipe 2 dengan cara meningkatkan sensitivitas tubuh terhadap insulin.",
        indication: "Untuk mengendalikan kadar gula darah pada pasien diabetes tipe 2.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki gagal ginjal, penyakit hati, atau alergi terhadap metformin.",
        composition: "Tiap tablet mengandung 500 mg, 850 mg, atau 1000 mg metformin.",
        dose: "Dosis awal biasanya 500 mg atau 850 mg dua hingga tiga kali sehari bersama makanan.",
        usage: "Tablet ditelan utuh dengan air saat makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk gangguan pencernaan, diare, dan gangguan penciuman.",
        categoryId: 6,
        price: 13000,
        stock: 6,
        image: "https://media.istockphoto.com/id/472120679/photo/metformin.webp?s=612x612&w=is&k=20&c=slHlmbW9sn4ZeKxT2vtNlZclURlw2ius0WMDMhdEjvg=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Atorvastatin",
        description: "Atorvastatin adalah obat golongan statin yang digunakan untuk menurunkan kadar kolesterol dan mencegah penyakit jantung.",
        indication: "Untuk mengurangi kadar kolesterol total, LDL (kolesterol jahat), trigliserida, dan meningkatkan HDL (kolesterol baik) pada pasien dengan hiperlipidemia atau risiko penyakit jantung.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap atorvastatin atau komponen lain dalam obat ini, serta wanita hamil atau menyusui.",
        composition: "Tiap tablet mengandung 10 mg, 20 mg, 40 mg, atau 80 mg atorvastatin.",
        dose: "Dosis tergantung pada tingkat keparahan hiperlipidemia dan faktor risiko penyakit jantung. Biasanya diberikan dosis awal 10 mg hingga 20 mg sekali sehari.",
        usage: "Tablet ditelan utuh dengan air, dapat diminum kapan saja, terlepas dari makanan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk nyeri otot, gangguan pencernaan, dan peningkatan risiko diabetes.",
        categoryId: 9,
        price: 22000,
        stock: 9,
        image: "https://media.istockphoto.com/id/488048497/photo/three-atorvastatin-tablets-close-up.webp?s=612x612&w=is&k=20&c=EaY9IdxSOeeOTkfPHXdmSuRBjaBXxXPeL-QOdcV9a7k=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Prednisone",
        description: "Prednisone adalah obat kortikosteroid yang digunakan untuk mengurangi peradangan dan meredakan gejala pada berbagai kondisi, termasuk alergi, asma, artritis, dan kondisi autoimun.",
        indication: "Untuk mengobati berbagai kondisi peradangan dan autoimun, termasuk alergi, asma, artritis, lupus, dan penyakit Crohn.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap prednisone, serta individu dengan infeksi jamur yang tidak diobati.",
        composition: "Tiap tablet mengandung 1 mg, 2.5 mg, 5 mg, 10 mg, atau 20 mg prednisone.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan kondisi. Biasanya diberikan dosis awal 5 mg hingga 60 mg per hari.",
        usage: "Tablet ditelan utuh dengan air, sebaiknya diminum setelah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk peningkatan nafsu makan, gangguan pencernaan, peningkatan risiko infeksi, dan gangguan tidur.",
        categoryId: 7,
        price: 18000,
        stock: 11,
        image: "https://amanfarma.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-16-at-10.36.00-768x768.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Diphenhydramine",
        description: "Diphenhydramine adalah antihistamin generasi pertama yang digunakan untuk meredakan gejala alergi, seperti rinitis alergi, gatal-gatal, dan reaksi alergi pada kulit.",
        indication: "Untuk meredakan gejala alergi seperti bersin-bersin, hidung tersumbat, gatal-gatal, dan ruam alergi.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap diphenhydramine atau antihistamin lainnya.",
        composition: "Tiap tablet mengandung 25 mg atau 50 mg diphenhydramine.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan gejala alergi. Biasanya diberikan dosis awal 25 mg hingga 50 mg setiap 4-6 jam.",
        usage: "Tablet ditelan utuh dengan air, dapat diminum sebelum atau sesudah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk mengantuk, mulut kering, pusing, dan gangguan penglihatan.",
        categoryId: 3,
        price: 15000,
        stock: 18,
        image: "https://amanfarma.com/wp-content/uploads/2022/05/Diphenhydramine-1-510x510.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hydrochlorothiazide",
        description: "Hydrochlorothiazide adalah diuretik thiazide yang digunakan untuk mengobati hipertensi (tekanan darah tinggi) dan edema (pembengkakan) yang disebabkan oleh gagal jantung, gagal ginjal, atau kondisi lainnya.",
        indication: "Untuk mengurangi tekanan darah tinggi dan mengurangi retensi cairan pada kondisi seperti gagal jantung, gagal ginjal, dan edema.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap hydrochlorothiazide atau sulfa, serta individu dengan gangguan fungsi hati atau ginjal yang parah.",
        composition: "Tiap tablet mengandung 12.5 mg, 25 mg, atau 50 mg hydrochlorothiazide.",
        dose: "Dosis tergantung pada kondisi pasien. Biasanya diberikan dosis awal 12.5 mg hingga 50 mg sekali sehari.",
        usage: "Tablet ditelan utuh dengan air, dapat diminum sebelum atau sesudah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk peningkatan frekuensi buang air kecil, peningkatan risiko infeksi saluran kemih, dan gangguan elektrolit seperti penurunan kadar kalium dalam darah.",
        categoryId: 2,
        price: 17000,
        stock: 13,
        image: "https://d3bbrrd0qs69m4.cloudfront.net/images/product/large/apotek_online_k24klik_20200814033654359225_HYDROCHLOROTHIAZIDE.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cetirizine",
        description: "Cetirizine adalah antihistamin generasi kedua yang digunakan untuk meredakan gejala alergi, seperti rinitis alergi, gatal-gatal, dan mata berair.",
        indication: "Untuk meredakan gejala alergi seperti bersin-bersin, hidung tersumbat, gatal-gatal, dan mata berair.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap cetirizine atau antihistamin lainnya.",
        composition: "Tiap tablet mengandung 5 mg atau 10 mg cetirizine.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan gejala alergi. Biasanya diberikan dosis awal 5 mg atau 10 mg sekali sehari.",
        usage: "Tablet ditelan utuh dengan air, tidak tergantung pada makanan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk mengantuk, pusing, mulut kering, dan gangguan pencernaan.",
        categoryId: 8,
        price: 10000,
        stock: 22,
        image: "https://d3bbrrd0qs69m4.cloudfront.net/images/product/large/apotek_online_k24klik_20230406105349359225_CETIRIZINE-KF.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Methotrexate",
        description: "Methotrexate adalah obat sitotoksik yang digunakan untuk mengobati berbagai jenis kanker, seperti leukemia, limfoma, dan kanker payudara, serta untuk mengobati penyakit autoimun, seperti rheumatoid arthritis dan psoriasis.",
        indication: "Untuk mengobati berbagai jenis kanker dan penyakit autoimun.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap methotrexate atau komponen lain dalam obat ini, serta oleh wanita hamil atau menyusui.",
        composition: "Tiap tablet mengandung 2.5 mg methotrexate.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan kondisi. Biasanya diberikan dosis awal 7.5 mg hingga 25 mg satu kali per minggu.",
        usage: "Tablet ditelan utuh dengan air, sebaiknya setelah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk mual, muntah, diare, dan penurunan jumlah sel darah.",
        categoryId: 7,
        price: 30000,
        stock: 4,
        image: "https://kalbemed.com/storage/images/products/8db30ffa6d2691c11318d87237ddcc6c.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ranitidine",
        description: "Ranitidine adalah obat antagonis reseptor H2 yang digunakan untuk mengurangi produksi asam lambung dan meredakan gejala tukak lambung, refluks asam, dan sindrom Zollinger-Ellison.",
        indication: "Untuk mengobati tukak lambung, refluks asam, dan kondisi berlebihan produksi asam lambung.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap ranitidine atau komponen lain dalam obat ini.",
        composition: "Tiap tablet mengandung 150 mg atau 300 mg ranitidine.",
        dose: "Dosis tergantung pada kondisi pasien. Biasanya diberikan dosis awal 150 mg hingga 300 mg dua kali sehari.",
        usage: "Tablet ditelan utuh dengan air, sebaiknya sebelum makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk sakit kepala, pusing, diare, dan gangguan pencernaan.",
        categoryId: 5,
        price: 11000,
        stock: 14,
        image: "https://kalbemed.com/storage/images/products/90b15a1892df4878e2fc24495c3c891b.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Simvastatin",
        description: "Simvastatin adalah obat golongan statin yang digunakan untuk menurunkan kadar kolesterol total, LDL (kolesterol jahat), dan trigliserida dalam darah, serta meningkatkan HDL (kolesterol baik).",
        indication: "Untuk mengobati hiperlipidemia (tingkat kolesterol tinggi) dan mengurangi risiko penyakit jantung dan stroke.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap simvastatin atau statin lainnya, serta oleh wanita hamil atau menyusui.",
        composition: "Tiap tablet mengandung 5 mg, 10 mg, 20 mg, atau 40 mg simvastatin.",
        dose: "Dosis tergantung pada tingkat keparahan hiperlipidemia. Biasanya diberikan dosis awal 10 mg hingga 40 mg sekali sehari pada malam hari.",
        usage: "Tablet ditelan utuh dengan air, sebaiknya pada malam hari setelah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk nyeri otot, gangguan pencernaan, dan peningkatan risiko diabetes.",
        categoryId: 9,
        price: 24000,
        stock: 9,
        image: "https://kalbemed.com/storage/images/products/ddc84f302254ea6da58e57f362b33823.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lisinopril",
        description: "Lisinopril adalah obat ACE inhibitor yang digunakan untuk mengobati tekanan darah tinggi (hipertensi), gagal jantung, dan mencegah kerusakan pada ginjal akibat diabetes.",
        indication: "Untuk mengobati tekanan darah tinggi, gagal jantung, dan melindungi ginjal pada pasien diabetes.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap lisinopril atau ACE inhibitor lainnya, serta oleh wanita hamil atau menyusui.",
        composition: "Tiap tablet mengandung 5 mg, 10 mg, atau 20 mg lisinopril.",
        dose: "Dosis tergantung pada kondisi pasien. Biasanya diberikan dosis awal 10 mg sekali sehari.",
        usage: "Tablet ditelan utuh dengan air, sebaiknya sebelum makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk batuk kering, pusing, lemah, dan penurunan tekanan darah.",
        categoryId: 1,
        price: 17000,
        stock: 12,
        image: "https://www.meldinpharma.com/web/image/product.product/2971/image_1024/%5BUKP_GEN-182%5D%20Lisinopril%2010mg%20Cap%2028%27s%20%28Teva%29?unique=ccfd778",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Metronidazole",
        description: "Metronidazole adalah obat antimikroba yang digunakan untuk mengobati infeksi bakteri dan protozoa, termasuk infeksi pada saluran pencernaan, genital, dan kulit.",
        indication: "Untuk mengobati infeksi bakteri dan protozoa, termasuk infeksi pada saluran pencernaan, genital, dan kulit.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap metronidazole atau nitroimidazole lainnya, serta oleh wanita hamil pada trimester pertama.",
        composition: "Tiap tablet mengandung 250 mg atau 500 mg metronidazole.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan infeksi. Biasanya diberikan dosis awal 500 mg hingga 750 mg setiap 8 jam.",
        usage: "Tablet ditelan utuh dengan air, sebaiknya diminum setelah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk mual, muntah, diare, dan gangguan pencernaan.",
        categoryId: 6,
        price: 19000,
        stock: 8,
        image: "https://kalbemed.com/storage/images/products/4d9860fd6a15755c27a082ed3d118c80.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cephalexin",
        description: "Cephalexin adalah antibiotik golongan cephalosporin yang digunakan untuk mengobati berbagai infeksi bakteri, termasuk infeksi pada saluran pernapasan, kulit, dan saluran kemih.",
        indication: "Untuk mengobati infeksi bakteri, termasuk infeksi pada saluran pernapasan, kulit, dan saluran kemih.",
        contraIndication: "Tidak boleh digunakan oleh individu yang memiliki alergi terhadap cephalexin atau antibiotik cephalosporin lainnya.",
        composition: "Tiap kapsul mengandung 250 mg atau 500 mg cephalexin.",
        dose: "Dosis tergantung pada jenis dan tingkat keparahan infeksi. Biasanya diberikan dosis awal 250 mg hingga 500 mg setiap 6 jam.",
        usage: "Kapsul ditelan utuh dengan air, sebaiknya diminum setelah makan.",
        sideEffect: "Efek samping yang mungkin terjadi termasuk mual, muntah, diare, dan reaksi alergi.",
        categoryId: 4,
        price: 16000,
        stock: 10,
        image: "https://www.k24klik.com/images/product/apotek_online_k24klik_201807271107274677_cephalexin.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Medicines', {
      name: {
        [Sequelize.Op.in]: ['Paracetamol', 'Anti Depresant', 'Aspirin', 'Vitamin C', 'Betadine']
      }
    }, {});
  }
};
