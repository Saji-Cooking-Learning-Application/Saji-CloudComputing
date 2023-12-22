# SAJI Backend-API
# API DOCUMENTATION

### Endpoint

https://saji-cc-api-2srtjzs7ba-et.a.run.app

### REGISTER

- URL
    
    - `/register`
    
- METHOD
    
   - POST
    
- REQUEST BODY
```json
{
  "username": "string",
  "password": "string",
  "nama": "string"
  "email": "user@example.com"
  "hp": "int"
}
  ```  
- RESPONSE
    
```json
{
    "code": 201,
    "status": "OK",
    "message": "Registration successful",
    "data": null
}
```
    

### LOGIN

- URL
    
    /login
    
- METHOD
    
    POST
    
- REQUEST BODY
    
```json
{
  "username": "string",
  "password": "string"
}
```
    
- RESPONSE
```json
{
    "code": 200,
    "status": "OK",
    "user_id": 5,
    "message": "Login successful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJ5dWRpYTEyMzQ1IiwiaWF0IjoxNzAzMjIwNzEwLCJleHAiOjE3MDMyMjQzMTB9.TF-Oa_bN_2uHmwKFogVmSVK4BaQvygZNZgtyD211p6s",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJ5dWRpYTEyMzQ1IiwiaWF0IjoxNzAzMjIwNzEwfQ.tYhL4JyHowWmyw-S2qe7a3m0pbuffu5WKtTc9C0wi40"
}
```

### GET USER PROFIL

- URL
    
    /profile
    
- METHOD
    
    GET
    
- RESPONSE
```json
{
    "code": 201,
    "status": "OK",
    "message": "User Profile data obtained successfully",
    "data": [
        {
            "id": 3,
            "id_users": 5,
            "nama": "Putu Yudia",
            "tanggal_lahir": null,
            "alamat": null,
            "email": "yudiaasasoqq@gmasi.com",
            "no_hp": "0988801129938",
            "foto": null
        }
    ]
}
```

### UPDATE USER PROFILE

- URL
    
    /profile
    
- METHOD
    
    POST
    
- REQUEST BODY
    
```json
{
  "nama": "string"
  "tanggal_lahir": "date"
  "alamat": "string"
  "email": "user@example.com"
  "hp": "int"
  "foto": "blob"
}
```
    
- RESPONSE
```json
{
    "code": 201,
    "status": "OK",
    "message": "User Profile data successfully updated"
}
```
    

### GET ALL RESEP

- URL
    
    /resep
    
- METHOD
    
    GET
    
- HEADERS
    
    Authorization: Bearer <Token>
    
- RESPONSE
    
```json
{
    "code": 201,
    "status": "OK",
    "message": "Recipe data obtained successfully",
    "data": [
        {
            "id": 1,
            "nama_menu": "Terong Balado",
            "foto": "https://storage.googleapis.com/asset_saji/menu/terong%20balado%20(1).jpg"
        },
        {
            "id": 2,
            "nama_menu": "Kentang Goreng",
            "foto": "https://storage.googleapis.com/asset_saji/menu/kentang%20goreng%20(1).jpg"
        },
        ...
    ]
}
```
    

### GET DETAIL RESEP

- URL
    
    /resep/{id}
    
- METHOD
    
    GET
    
- HEADERS
    
    Authorization: Bearer <Token>
    
- RESPONSE
    
```json
{
    "code": 201,
    "status": "OK",
    "message": "Recipe details obtained successfully",
    "data": {
        "id": 1,
        "nama_menu": "Terong Balado",
        "deskripsi": "\nTerong balado adalah hidangan khas Indonesia yang terdiri dari terong yang digoreng dan disajikan dengan sambal balado, yaitu sambal pedas yang terbuat dari cabai, bawang, tomat, dan bumbu-bumbu lainnya yang diuleg atau dihaluskan. Terong balado memiliki kombinasi rasa pedas, gurih, dan sedikit manis yang membuatnya lezat dan populer di meja makan Indonesia. Hidangan ini sering dihidangkan sebagai lauk pendamping nasi putih dan dapat ditemui dalam berbagai variasi tergantung pada selera dan kebiasaan lokal.",
        "nutrisi": {
            "jumlah_kalori": 100,
            "protein": 100,
            "lemak": 2,
            "karbohidrat": 6,
            "serat": 3,
            "vitamin_A": 10,
            "vitamin_C": 3,
            "dan_lain_lain": "Terong balado, selain memiliki rasa yang lezat, juga dapat memberikan beberapa kelebihan berdasarkan bahan-bahan yang digunakan dan karakteristiknya. "
        },
        "assets": {
            "foto1": "https://storage.googleapis.com/asset_saji/menu/terong%20balado%20(1).jpg",
            "foto2": "https://storage.googleapis.com/asset_saji/menu/terong%20balado%20(2).jpeg",
            "foto3": "https://storage.googleapis.com/asset_saji/menu/terong%20balado%20(3).jpg"
        },
        "resep": [
            {
                "id": 1,
                "nama_bahan": "Terong",
                "takaran": 4,
                "unit": "buah"
            },
            {
                "id": 6,
                "nama_bahan": "Cabe Rawit",
                "takaran": 10,
                "unit": "buah"
            },
            {
                "id": 4,
                "nama_bahan": "Bawang Putih",
                "takaran": 6,
                "unit": "siung"
            },
            {
                "id": 3,
                "nama_bahan": " Bawang Merah",
                "takaran": 4,
                "unit": "siung"
            },
            {
                "id": 9,
                "nama_bahan": "Garam",
                "takaran": 1,
                "unit": "sdt"
            },
            {
                "id": 10,
                "nama_bahan": "Gula Pasir",
                "takaran": 1,
                "unit": "sdt"
            }
        ]
    }
}
```
    

### GET ALL BAHAN

- URL
    
    /bahan
    
- METHOD
    
    GET
    
- HEADERS
    
    Authorization: Bearer <Token>
    
- RESPONSE
    
```json
{
    "code": 201,
    "status": "OK",
    "message": "Ingredient data obtained successfully",
    "data": [
        {
            "id": 1,
            "nama_bahan": "Terong",
            "foto": "https://storage.googleapis.com/asset_saji/bahan/terong%20(1).jpg"
        },
        {
            "id": 2,
            "nama_bahan": "Nasi",
            "foto": "https://storage.googleapis.com/asset_saji/bahan/nasi.jpg"
        },
        ...
    ]
}
```
### GET DETAIL BAHAN
- URL
    
    /bahan/{id}
    
- METHOD
    
    GET
    
- HEADERS
    
    Authorization: Bearer <Token>
    
   
- RESPONSE
```json
{
    "code": 201,
    "status": "OK",
    "message": "Ingredient details obtained successfully",
    "data": [
        {
            "id": 1,
            "nama_bahan": "Terong",
            "deskripsi": "Terong (Solanum melongena), atau yang dikenal sebagai terong, adalah tanaman buah-buahan yang termasuk dalam keluarga Solanaceae. Terong biasanya memiliki bentuk bulat atau lonjong, dengan warna yang bervariasi dari ungu, merah, kuning, hijau, hingga putih.",
            "manfaat": "1. Kaya Nutrisi: Terong mengandung nutrisi penting seperti serat, vitamin C, vitamin K, vitamin B6, folat, dan potassium. Nutrisi ini berperan dalam mendukung kesehatan jantung, sistem pencernaan, dan tulang.\r\n\r\n2. Antioksidan: Terong mengandung senyawa antioksidan, seperti nasunin dan klorogenik asam, yang membantu melawan radikal bebas dalam tubuh. Antioksidan dapat melindungi sel-sel tubuh dari kerusakan dan peradangan.\r\n\r\n3. Menurunkan Risiko Penyakit Jantung: Konsumsi terong dapat membantu menurunkan tekanan darah dan kolesterol, yang dapat mengurangi risiko penyakit jantung.\r\n\r\n4. Pertahankan Berat Badan Sehat: Terong memiliki kandungan serat yang tinggi, sehingga dapat membantu menjaga perasaan kenyang lebih lama, mendukung manajemen berat badan, dan menjaga fungsi pencernaan yang sehat.\r\n\r\n5. Mendukung Kesehatan Otak: Beberapa komponen dalam terong, seperti nasunin, dikaitkan dengan manfaat bagi kesehatan otak, termasuk perlindungan terhadap kerusakan sel saraf.\r\n\r\n6. Sumber Antiinflamasi: Terong mengandung senyawa antiinflamasi yang dapat membantu mengurangi peradangan dalam tubuh, memberikan potensi manfaat untuk penderita arthritis atau kondisi inflamasi lainnya.\r\n\r\n7. Meningkatkan Kesehatan Mata: Kandungan vitamin A dalam terong dapat mendukung kesehatan mata dan mencegah masalah mata, seperti degenerasi makula.\r\n\r\n8. Dapat Digunakan dalam Berbagai Masakan: Terong dapat diolah dalam berbagai masakan, mulai dari tumis, curries, hingga hidangan panggang, sehingga memberikan variasi dalam konsumsi makanan sehari-hari.",
            "foto": "https://storage.googleapis.com/asset_saji/bahan/terong%20(1).jpg"
        }
    ]
}
```

### GET TUTORIAL
- URL
    
    /tutorial/{id}
    
- METHOD
    
    GET
    
- HEADERS
    
    Authorization: Bearer <Token>
    
   
- RESPONSE
```json
{
    "code": 201,
    "status": "OK",
    "message": "Tutorial data retrieved successfully",
    "data": [
        {
            "id": 1,
            "id_menu": 1,
            "page": 1,
            "deskripsi": "Siapkan semua bahan yang di perlukan.\r\n",
            "foto": null
        },
        {
            "id": 6,
            "id_menu": 1,
            "page": 2,
            "deskripsi": "Panaskan minyak sampai mendidih, goreng terong yang sudah diiris sampai setengah matang, angkat dan tiriskan.",
            "foto": null
        },
        {
            "id": 7,
            "id_menu": 1,
            "page": 3,
            "deskripsi": "Haluskan bawang merah dan putih, cabe, tomat, dan terasi sampai tekstur yg diinginkan.",
            "foto": null
        },
        {
            "id": 8,
            "id_menu": 1,
            "page": 4,
            "deskripsi": "Panaskan minyak, tumis bumbu halus dan serai hingga harum, tambahkan garam, gula dan kaldu bubuk. Koreksi rasa",
            "foto": null
        },
        {
            "id": 9,
            "id_menu": 1,
            "page": 5,
            "deskripsi": "Masukkan terong dan teri yg telah digoreng. Masak beberapa saat",
            "foto": null
        },
        {
            "id": 10,
            "id_menu": 1,
            "page": 6,
            "deskripsi": "Terong Balado siap disajikan. Selamat mencoba dan semoga bermanfaat.",
            "foto": null
        }
    ]
}
```
