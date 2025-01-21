# 🌟 IoT Home Automation Project

Welcome to the **IoT Home Automation** project! 🏠✨ This repository is your gateway to creating a smart home experience using ESP32 and ReactJS. Control your lights with ease through a sleek web interface. 💡🔧

---

## 🚀 Project Structure

```
📦 IoT-Home-Automation
├── 📁 client   # ReactJS Web Interface 🌐
├── 📁 server   # ESP32 Code for API Backend 🔌
└── 📁 docs     # Documentation (Coming Soon™) 📚
```

---

## 🎯 Features

✅ Turn lights ON/OFF using API endpoints.  
✅ Scalability for future enhancements (Add more devices easily!) 🛠️  
✅ ReactJS-based intuitive web interface. 🌟  
✅ Wi-Fi-based control for ultimate convenience. 📶

---

## 📖 Getting Started

Follow these steps to bring your smart home to life:

### 1️⃣ Clone the Repo
```bash
$ git clone https://github.com/Thamidu-Nadun/IOT_HOME_EXPERIMENT.git
$ cd IoT-Home-Automation
```

### 2️⃣ Setup the Server
1. Navigate to the `server` folder:
   ```bash
   $ cd server
   ```
2. Upload the Arduino code to your ESP32 board using the Arduino IDE. 🛠️
3. Update your Wi-Fi credentials in the code:
   ```cpp
   const char* ssid = "your_SSID";
   const char* password = "your_PASSWORD";
   ```
4. Power up your ESP32, and the server is ready! 🚦

### 3️⃣ Setup the Client
1. Navigate to the `client` folder:
   ```bash
   $ cd ./client
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the React development server:
   ```bash
   $ npm start
   ```
4. Access the web interface at:
   ```
   http://localhost:5173
   ```

---

## 📸 Preview

🚪 **Login to Your Smart Home:**

<center>
   <img src="https://raw.githubusercontent.com/Thamidu-Nadun/IOT_HOME_EXPERIMENT/assests/assets/img_1.png" width="50%" height="50%">
</center>

💡 **Control Your Lights with Style:**

![Lights Control Meme](https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif)

---

## 📜 API Endpoints

### Base URL: `http://<ESP32_IP>`

| Endpoint                     | Method | Description                   |
|------------------------------|--------|-------------------------------|
| `/api/led?id=<id>&action=on` | GET    | Turn ON the light with ID     |
| `/api/led?id=<id>&action=off`| GET    | Turn OFF the light with ID    |

---

## 💻 Technologies Used

- **Hardware**: ESP32 🛠️
- **Backend**: Arduino C++ 🔌
- **Frontend**: ReactJS ⚛️
- **Communication**: Wi-Fi 📶

---

## 🤝 Contributions

We'd love your contributions to make this project even better! Submit your ideas, issues, or pull requests to this repository. 🚀

---

## 📄 License

MIT License. Feel free to use, modify, and distribute this project as you like! 📝

---

### 🎉 Thank You for Visiting!

If you enjoyed this project, don't forget to **star** ⭐ the repo and share it with your friends!

![Thanks GIF](https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif)

