# 🛡️ Sentinel Breeze | Network Firewall Manager

A premium, web-based firewall simulation and management dashboard designed to demonstrate network security principles. Built for the **INS Mini Project**.

![Sentinel Breeze UI]

## 🌟 Overview

**Sentinel Breeze** is a modern security operations dashboard that allows users to configure firewall rules and visualize real-time network traffic. It bridges the gap between educational simulation and real-world system administration by generating actual Windows Firewall commands for every rule created.

## ✨ Key Features

- **🚀 Real-Time Traffic Simulation**: A custom engine generates synthetic network packets to show the firewall's decision-making process in action.
- **💎 Premium Glassmorphism UI**: High-end, light-themed aesthetic with animated mesh backgrounds and smooth transitions.
- **⚙️ Dynamic Rule Management**: Easily add, edit, and delete rules for specific ports (80, 443, 22, etc.), protocols, and directions.
- **📜 Professional Command Generator**: Automatically creates the exact `netsh advfirewall` PowerShell commands for Windows environments.
- **📊 Analytics & Monitoring**: Live counters for total packets, allowed traffic, and threats blocked.

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Custom Design System)
- **Tooling**: [Vite](https://vitejs.dev/) for fast development and bundling
- **Typography**: Inter & Roboto Mono (via Google Fonts)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- npm (v7.x or higher)

### Installation & Layout

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cadleedsouzaa/INS-MiniProject.git
   cd INS-MiniProject
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**: Navigate to `http://localhost:5173`.

## 📖 Presentation Guide

- **Safe Web Mode**: Add a rule for Port 80 (ALLOW) to show green traffic Flow.
- **Strict Security**: Delete all rules and watch the global block policy take over (all red logs).
- **Admin Demonstration**: Click the **Cmd** icon on any rule to show the professional system command generated for that specific policy.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Developed as a Mini Project for Information & Network Security.*
