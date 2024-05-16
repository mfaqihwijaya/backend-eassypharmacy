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
        description: "Paracetamol is a common pain reliever and a fever reducer. It is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
        price: 10000,
        stock: 5,
        image: "https://media.istockphoto.com/id/1217118257/id/foto/wanita-memegang-kotak-tablet-parasetamol-1000mg-di-tangannya-dan-segelas-air.webp?s=612x612&w=is&k=20&c=ES38si9xIzj6L-4fyjFqpxenhEyH9lextXaBw6mr-eI=",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
          name: "Ibuprofen",
          description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID). It is commonly used to relieve pain, reduce inflammation, and lower fever. It is often used to treat conditions such as headache, toothache, muscle aches, arthritis, menstrual cramps, and minor injuries.",
          price: 12000,
          stock: 8,
          image: "https://media.istockphoto.com/id/1163798570/photo/ibuprofen-medication.webp?s=612x612&w=is&k=20&c=QKM0z6zd_EbsVUA6u8PWaB2DGIsAnUiLhieCixtBW90=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Aspirin",
          description: "Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) and a salicylate. It is used to treat pain, inflammation, and fever. It is also used to reduce the risk of heart attacks and strokes in people at high risk.",
          price: 8000,
          stock: 10,
          image: "https://media.istockphoto.com/id/458563393/photo/aspirin-bottle-with-tablets-spilling-out.webp?s=612x612&w=is&k=20&c=r_k8dH2r0vQ24XMKFrRMxMz_tvQkPrS3d3MgCtaK8IU=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Ciprofloxacin",
          description: "Ciprofloxacin is an antibiotic that belongs to the fluoroquinolone class. It is used to treat bacterial infections such as urinary tract infections, sinus infections, respiratory infections, skin infections, and certain sexually transmitted diseases.",
          price: 15000,
          stock: 3,
          image: "https://media.istockphoto.com/id/1164018543/photo/generic-tablets-of-ciprofloxacin-antibiotics.webp?s=612x612&w=is&k=20&c=KSBbNw9e1e_yc3fMhHYiBKF3zITPqXe5v7VOHsIabo4=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Amoxicillin",
          description: "Amoxicillin is an antibiotic that belongs to the penicillin class. It is used to treat bacterial infections such as ear infections, throat infections, sinus infections, pneumonia, and urinary tract infections.",
          price: 18000,
          stock: 7,
          image: "https://media.istockphoto.com/id/1295333389/photo/amoxicillin.webp?s=612x612&w=is&k=20&c=AfyC_jSSuYHJuhxHkftdhhlF3wUbqR18_dQNMI5kvhI=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Loratadine",
          description: "Loratadine is an antihistamine that is used to treat allergy symptoms such as sneezing, runny nose, itching, and watery eyes. It is also used to treat itching and redness caused by hives.",
          price: 9000,
          stock: 15,
          image: "https://media.istockphoto.com/id/1343262408/photo/generic-box-of-loratadine-or-allergy-relief-pills-white-background.webp?s=612x612&w=is&k=20&c=n4LNTeTecuDT0X07RQ0efAviSoH_ltfNHYdmi5VwS8I=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Omeprazole",
          description: "Omeprazole is a proton pump inhibitor (PPI) that reduces the amount of acid produced in the stomach. It is used to treat conditions such as gastroesophageal reflux disease (GERD), ulcers, and other conditions caused by excess stomach acid.",
          price: 20000,
          stock: 20,
          image: "https://media.istockphoto.com/id/1297469143/photo/packet-of-generic-omeprazole-pills.webp?s=612x612&w=is&k=20&c=F9pg9CyKFxL3FhVbj9ligUfE4n53AP0NYp5KfLGNY_4=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Diazepam",
          description: "Diazepam is a benzodiazepine that is used to treat anxiety disorders, muscle spasms, alcohol withdrawal symptoms, and seizures. It works by enhancing the effects of gamma-aminobutyric acid (GABA), a neurotransmitter that inhibits brain activity.",
          price: 25000,
          stock: 12,
          image: "https://media.istockphoto.com/id/1295607003/photo/benzodiazepine.webp?s=612x612&w=is&k=20&c=uN-J9Q7mK9ENnZ8zSU2sdXOSIwDeLs2mmzsufhX4GqQ=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Metformin",
          description: "Metformin is a medication used to treat type 2 diabetes. It works by decreasing glucose production in the liver and increasing insulin sensitivity in the body. It is often used in combination with diet and exercise to control blood sugar levels.",
          price: 13000,
          stock: 6,
          image: "https://media.istockphoto.com/id/472120679/photo/metformin.webp?s=612x612&w=is&k=20&c=slHlmbW9sn4ZeKxT2vtNlZclURlw2ius0WMDMhdEjvg=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Atorvastatin",
          description: "Atorvastatin is a statin medication used to lower cholesterol levels and reduce the risk of heart attack, stroke, and other cardiovascular diseases. It works by inhibiting the enzyme HMG-CoA reductase, which plays a key role in cholesterol synthesis.",
          price: 22000,
          stock: 9,
          image: "https://media.istockphoto.com/id/488048497/photo/three-atorvastatin-tablets-close-up.webp?s=612x612&w=is&k=20&c=EaY9IdxSOeeOTkfPHXdmSuRBjaBXxXPeL-QOdcV9a7k=",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Prednisone",
          description: "Prednisone is a corticosteroid medication used to treat a variety of conditions such as asthma, allergies, arthritis, lupus, psoriasis, ulcerative colitis, and certain types of cancer. It works by suppressing the immune system and reducing inflammation.",
          price: 18000,
          stock: 11,
          image: "https://amanfarma.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-16-at-10.36.00-768x768.jpeg",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Diphenhydramine",
          description: "Diphenhydramine is an antihistamine that is used to relieve allergy symptoms such as sneezing, runny nose, itching, and watery eyes. It is also used to treat motion sickness, insomnia, and mild cases of Parkinson's disease.",
          price: 15000,
          stock: 18,
          image: "https://amanfarma.com/wp-content/uploads/2022/05/Diphenhydramine-1-510x510.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Hydrochlorothiazide",
          description: "Hydrochlorothiazide is a diuretic medication used to treat high blood pressure and fluid retention (edema) caused by various conditions such as heart failure, kidney problems, and liver cirrhosis. It works by increasing urine production, which helps to remove excess fluid and salt from the body.",
          price: 17000,
          stock: 13,
          image: "https://d3bbrrd0qs69m4.cloudfront.net/images/product/large/apotek_online_k24klik_20200814033654359225_HYDROCHLOROTHIAZIDE.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Cetirizine",
          description: "Cetirizine is a second-generation antihistamine that is used to treat allergy symptoms such as sneezing, runny nose, itching, and watery eyes. It is also used to treat itching and swelling caused by chronic urticaria (hives).",
          price: 10000,
          stock: 22,
          image: "https://d3bbrrd0qs69m4.cloudfront.net/images/product/large/apotek_online_k24klik_20230406105349359225_CETIRIZINE-KF.png",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Methotrexate",
          description: "Methotrexate is a chemotherapy drug and immune system suppressant that is used to treat various types of cancer, rheumatoid arthritis, psoriasis, and other autoimmune diseases. It works by interfering with the growth of cancer cells and suppressing the immune system's response.",
          price: 30000,
          stock: 4,
          image: "https://kalbemed.com/storage/images/products/8db30ffa6d2691c11318d87237ddcc6c.jpeg",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        name: "Ranitidine",
        description: "Ranitidine is a histamine-2 blocker that reduces the amount of acid produced in the stomach. It is used to treat conditions such as heartburn, acid reflux, ulcers, and gastroesophageal reflux disease (GERD). Ranitidine provides relief from symptoms by decreasing stomach acid production.",
        price: 11000,
        stock: 14,
        image: "https://kalbemed.com/storage/images/products/90b15a1892df4878e2fc24495c3c891b.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
          name: "Simvastatin",
          description: "Simvastatin is a statin medication used to lower cholesterol levels and reduce the risk of heart attack, stroke, and other cardiovascular diseases. It works by inhibiting the enzyme HMG-CoA reductase, which plays a key role in cholesterol synthesis. Simvastatin helps to lower LDL cholesterol and triglyceride levels while increasing HDL cholesterol levels.",
          price: 24000,
          stock: 9,
          image: "https://kalbemed.com/storage/images/products/ddc84f302254ea6da58e57f362b33823.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Lisinopril",
          description: "Lisinopril is an angiotensin-converting enzyme (ACE) inhibitor that is used to treat high blood pressure, heart failure, and improve survival after a heart attack. It works by relaxing blood vessels, which helps to lower blood pressure and improve blood flow to the heart and other organs.",
          price: 17000,
          stock: 12,
          image: "https://www.meldinpharma.com/web/image/product.product/2971/image_1024/%5BUKP_GEN-182%5D%20Lisinopril%2010mg%20Cap%2028%27s%20%28Teva%29?unique=ccfd778",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Metronidazole",
          description: "Metronidazole is an antibiotic and antiprotozoal medication used to treat bacterial infections, parasitic infections, and certain types of sexually transmitted diseases. It works by stopping the growth of bacteria and other microorganisms, as well as by killing parasites.",
          price: 19000,
          stock: 8,
          image: "https://kalbemed.com/storage/images/products/4d9860fd6a15755c27a082ed3d118c80.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Cephalexin",
          description: "Cephalexin is a cephalosporin antibiotic used to treat bacterial infections such as skin infections, respiratory tract infections, ear infections, urinary tract infections, and bone infections. It works by interfering with the bacteria's cell wall synthesis, leading to their destruction.",
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
