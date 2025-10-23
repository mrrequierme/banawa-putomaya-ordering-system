# Putomaya Ordering System

A full-stack ordering system built with:

- Backend: Laravel REST API
- Frontend: Vue 3 + Vite + Tailwind CSS
- Live - https://banawaputomaya.vercel.app

## Project Structure

putomaya-ordering-system/

- backend/ -> Laravel REST API
- frontend/ -> Vue.js frontend

## Features

- User authentication (Admin, Staff, Customer)
- Product management
- Order tracking
- History records
- Responsive design
### Installation - Local setup
### Backend Setup

- cd backend
- composer install
- copy .env.example paste to .env
- php artisan key:generate
- php artisan migrate
- php artisan serve

### Frontend Setup

- cd frontend
- npm install
- npm run dev
