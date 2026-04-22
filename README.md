# AI Image Studio

AI Image Studio is a full-stack web application where users can generate images using text prompts. It also provides a personal gallery, AI chat support, and a secure authentication system.

## Features

- Generate images from text prompts using AI
- Save generated images to a personal gallery
- View images with pagination
- Like and manage images
- Search images by prompt
- AI chat feature to ask questions
- Secure login and registration using JWT
- Clean and responsive UI

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios

Backend:
- Spring Boot
- Spring Security (JWT Authentication)
- REST APIs

AI & Storage:
- Hugging Face API (for image generation)
- OpenRouter API (for chat)
- Supabase (for image storage)

Database:
- PostgreSQL

## Project Structure
AI Image Generator/
├── ai-frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── spring-ai/
│ ├── controller/
│ ├── services/
│ ├── model/
│ ├── repositories/
│ └── application.properties (ignored)


## Setup Instructions
### 1. Clone the repository
https://github.com/shoaibakht34-wq/Stock_Photo_Generator

---

### 2. Backend Setup (Spring Boot)

Go to backend folder:

Create your own `application.properties` file (this is not included in repo):
spring.datasource.url=your_db_url
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

huggingface.api.key=your_hf_key
openrouter.api.key=your_openrouter_key

supabase.url=your_supabase_url
supabase.key=your_supabase_key

Run the backend:
mvn spring-boot:run

---

### 3. Frontend Setup (React)

Go to frontend folder:
cd ai-frontend

Install dependencies:
npm install

Run the app:
npm run dev

---

## API Endpoints

### Authentication
- POST `/auth/register`
- POST `/auth/login`

### AI Chat
- GET `/ask-ai?prompt=...`

### Image Generation
- POST `/generate-image`

### User Images
- GET `/my-images`

### Image Features
- DELETE `/delete-image/{id}`
- POST `/like-image/{id}`
- GET `/search-images?prompt=...`

---

## Notes

- `application.properties` is not included for security reasons.
- API keys should never be pushed to GitHub.
- `node_modules` is ignored in the repository.

---

## Author

Shoaib Akhtar

GitHub: https://github.com/shoaibakht34-wq
