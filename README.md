# Todo App

Günlük görevlerin kolayca takip edilmesini sağlar. <br />
Kullanıcılar görev ekleyebilir, tamamlanan görevleri işaretleyebilir yada istenmeyen görevleri silebilir. <br />
Her kullanıcı sadece kendi eklediği todo'larını listeyebilir.<br />
Profil ve şifre değiştirilebilir.<br />
Uzun süre oturum açılmışsa eski şifresini tekrar girmeli ve yeni şifre ile şifre oluşturulur.<br />

React'in bileşen tabanlı yapısı sayesinde, kullanıcı arayüzü dinamik ve etkileşimli hale getirildi.<br />
Redux Toolkit, global state'i daha etkili yönetmek için kullanıldı.<br />
Tailwind CSS ile duyarlı (responsive) bir tasarım sağlanmıştır.<br />
Firebase ile Kullanıcı kimlik doğrulaması eklendi.<br />

## Gif

![](/public/react-auth.gif)

## Projenin Çalıştırılması

Projeyi indiriniz veya fork ediniz. 'Visual Studio Code' editörü ile projeyi açınız.

```
git clone https://github.com/evinoguz/react-auth.git
```

Proje dizininde .env adında dosya oluşturunuz. Bu dosyada ortam değişkenlerini tanımlayınız.<br />
Bu ayarları yapmak için [Firebase](https://console.firebase.google.com/u/0/) dokümanından faydalanabilirsiniz. <br />
Buradan yeni proje oluşturunuz.<br />
goto console > projeAdı react-auth > continue > enabled pasif yap >
Web> nickname(ismi önemli değil) react-auth > Register App <br />
Daha sonra "Firebase configuration" değişkenlerinizin değerini çift tırnak olmadan belirtiniz.

```
VITE_API_KEY = yourApiKey
VITE_AUTH_DOMAIN = yourAuthDomain
VITE_PROJECT_ID = yourProjectId
VITE_STORAGE_BUCKET = yourStorageBucket
VITE_MESSAGING_SENDER_ID = yourMessagingSenderId
VITE_APP_ID = yourAppId
```

Veritabanınızı oluşturunuz. <br />
firebase>proje>build>firestore database >create database> eur3 (Europe) seç > Start in production mode

Google ile kullanıcı doğrulama işlemini aktifleştiriniz.<br />
firebase sol menüde > Build> Authentication > Get Started> Email/Password> Enabled butonunu aktif et > Save
Google > Enabled butonunu aktif et > Email seç > Save
Terminalde;

```
npm install

```

komutu ile paketler yüklenir, ardından

```
npm run dev
```

komutu ile projeyi ayağa kaldırınız.
