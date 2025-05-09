# 🕉️ Blockchain-Based Temple Fund Management System

A full-stack decentralized application (dApp) built to enable **transparent**, **accountable**, and **efficient** management of temple donations and expenditures. This platform leverages **blockchain technology** to bring trust and openness to religious institutions in India.

---

## ✨ Features

### 👥 Users (Devotees)
- Browse list of temples
- View temple profiles and donation history
- Make transparent donations via crypto or fiat
- View how their donations are utilized
- Track donation history
- Raise queries or feedback to temple admins

### 🧑‍💼 Temple Admin
- View donation records
- Log expenses with receipts & category
- Generate reports for internal use
- View donor messages & feedback

### 👑 Super Admin
- Add or remove temples
- Manage temple and admin profiles
- View aggregated reports across temples
- Detect anomalies in funds
- Manage roles and permissions

---

## 🏗️ Project Structure


---

## 💻 Tech Stack

### Frontend
- **Next.js**
- **TailwindCSS**
- **React Context & Hooks**
- **Role-Based UI Routing**

### Backend
- **Node.js + Express**
- **MongoDB (Mongoose)**
- **JWT Auth + Role Management**
- **REST API for frontend consumption**

### Blockchain
- **Solidity Smart Contracts**
- **Ether.js / Web3.js Integration**
- **MetaMask Wallet Support**
- **Polygon / Ethereum Testnet**

---

## 🔐 Roles

| Role        | Access                                               |
|-------------|------------------------------------------------------|
| User        | View & donate to temples, see history & usage        |
| Temple Admin| Manage one temple's data, log expenses               |
| Super Admin | Full platform access, manage temples and admins      |

---

## 🔄 Data Flow Overview

1. **User Donates** → Transaction stored on blockchain  
2. **Backend stores meta-data** (amount, temple, timestamp, etc.)  
3. **Temple Admin** logs expenses against received funds  
4. **Users** can verify usage of their donations in real-time
