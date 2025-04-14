## 🧰 Getting Started

Info run repo locally

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

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
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

| Parameter   | Type     | Description                            |
| :---------- | :------- | :------------------------------------- |
| `journalId` | `string` | **Required**. Id of a journal to fetch |
| `userId`    | `string` | **Required**. Id of a user to fetch    |
