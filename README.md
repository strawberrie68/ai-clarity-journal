# Clarity

![Clarity](https://github.com/user-attachments/assets/86d34cf9-65cb-4574-a1c9-5dfd5adb2df9)

## 💭 Clarity
### 📕 What is Clarity?

- Clarity is an AI journal that helps users clear their minds and help them be more productive.


![clarity (1)](https://github.com/user-attachments/assets/8c987d89-1428-4d6b-b22f-371192cc7d5d)

 <a href="https://clarity-lime.vercel.app/login" target="_blank">
<kbd> <br> 🛁 Project Link <br> </kbd></a>

#### ✨ Why Clarity


- Clarity is for journalers who find traditional ones insufficient for clearing their minds. It is powered by a custom AI agent whose directive is to be a friend and therapist, offering helpful feedback while revealing underlying issues, and helping to create actionable healthy habits.

## 🧑‍💻 Who should use Clarity:

**📝 Journal users:**

- Looking for a private therapist and friend to talk with.
- Wanting a way to create healthier habits tailored to their goals.

## 🎯 Features

- As a user, I want to have a place to write my journal entries.
- As a user, I want to have a look back at my past journal entries.
- As a user, I want to talk to an empathetic friend who talks objectively, helping me gain clarity.
- As a user, I want a summarized entry that affirms my issues.
- As a user, I want to see inspirational quotes on the dashboard to help with my issues.

## 👾 Tech Stack

**Client:** React, Next.js, TailwindCSS

**Server:** Next.js, MongoDB
**API:** OpenAI(3.5 Turbo)

## 🗺️ Sitemap

- Dashboard (Home)
- Journal entry - Entry prompt
- Journal entry - Conversation with Clarity
- Journal entry - Entry summarization
- Archive of past journal entries

### Mockups

|                                                             Dashboard                                                             |                                                               Start                                                               |                                                            Conversion                                                             |                                                              Summary                                                              |                                                              Archive                                                              |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/bc99cb71-a7ee-419f-8458-e8193fe7fdba" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/bb501feb-a4ad-42f3-925f-fc34a809629d" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/f8fc89a3-cd66-4a8a-883d-118ab185586c" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/a79fc2db-8296-4c88-b4eb-19dc84f6764a" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/0da06e06-8065-4a72-9d7c-1badf8ec4860" width="200"/> |

## 📮 Will implement soon

- As a user, I want suggestions on how I can face such issue(s).
- User can accept a habit/task/project suggestion as a trackable goal.
- The user can authenticate, making the journal secure.


## 🧰 Getting Started

### ⚙️ Installation

Install clarity with npm

```bash
  npm install i
  cd clarity
```

### 🏃‍♀️ Run Locally

Clone the project

```bash
  git clone git@github.com:strawberrie68/ai-clarity-journal.git
```

Go to the project directory

```bash
  cd clarity
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

### 🔑 Environment Variables

To run this project, you must add the following environment variables to your .env file. A .env.sample is provided in the file.

`DATABASE_URL` - A **MongoDb** string to connect to the database

`NEXT_PUBLIC_OPENAI_API_KEY` - An **OpenAI** API key from [OpenAI](https://platform.openai.com/docs/overview)



## 📚 API Reference

##### Create user

```http
POST /api/users
```

##### Get user

```http
GET /api/users/${userId}
```

##### Get user's journals

```http
GET /api/users/${userId}/journals
```

##### Create journals for user

```http
POST /api/users/${userId}/journal/entries
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `string` | **Required**. Id of a user to fetch |

### One Journal

#### Get a specific journal

```http
GET /api/users/${userId}/journal/entries/${journalId}
```

#### Update specific journal

```http
PUT /api/users/${userId}/journal/entries/${journalId}/update
```

#### Final Update for a specific journal

```http
PUT /api/users/${userId}/journal/entries/${journalId}/finalize
```

| Parameter   | Type     | Description                          |
| :---------- | :------- | :----------------------------------- |
| `journalId` | `string` | **Required**. Id of a journal to fetch |
| `userId`    | `string` | **Required**. Id of a user to fetch    |



