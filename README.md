# Clarity

## Overview

Clarity is an AI journal that helps users clear their minds and help them.

### Problem

Clarity is for journalers who find traditional ones insufficient for clearing their minds. It is powered by a custom AI agent whose directive is to be a friend and therapist, offering helpful feedback while revealing underlying issues, and helping to create actionable healthy habits.

### User Profile

**Journal users:**

- Looking for a private therapist and friend to talk with.
- Wanting a way to create healthier habits tailored to their goals.

### Features

- As a user, I want to have a place to write my journal entries.
- As a user, I want to have a look back at my past journal entries.
- As a user, I want to talk to an empathetic friend who talks objectively, helping me gain clarity.
- As a user, I want a summarized entry that affirms my issues.

## Implementation

### Tech Stack

**Data store:**

- MongoDB

**Backend:**

- Next.js

**Frontend:**

- React

**API:**

- OpenAI (3.5 Turbo)

### Sitemap

- Dashboard (Home)
- Journal entry - Entry prompt
- Journal entry - Conversation with Clarity
- Journal entry - Entry summarization
- Archive of past journal entries

### Mockups

|                                                             Dashboard                                                             |                                                               Start                                                               |                                                            Converstion                                                            |                                                              Summary                                                              |                                                              Archive                                                              |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/bc99cb71-a7ee-419f-8458-e8193fe7fdba" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/bb501feb-a4ad-42f3-925f-fc34a809629d" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/f8fc89a3-cd66-4a8a-883d-118ab185586c" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/a79fc2db-8296-4c88-b4eb-19dc84f6764a" width="200"/> | <img src="https://github.com/strawberrie68/Clarity-AI-Journal/assets/42231000/0da06e06-8065-4a72-9d7c-1badf8ec4860" width="200"/> |

## Roadmap

**Create client**

- Setup React boilerplate.

**Create server**

- Setup Express boilerplate.

Set up OpenAI.

Create a Dashboard.

Create a journal entry prompt screen.

- Implement a journal prompt area for users to submit.

Create a conversation screen.

- Implement OpenAI questions and prompts to help user clarify their mind.
- Implement a text area for users to continue digging deeper.

Create an entry summarization screen.

- Implement OpenAI finalized journal entry, that summarizes users' entry
- Implement a title that summarizes users' journal
- Implement task or habit suggestion.

Create a past journal entry screen.

- Implement a view of past journal entries in descending or ascending order.

## Nice-to-haves

-The journal has inspirational quotes on the dashboard.

- As a user, I want suggestions on how I can face such issue(s).
- User can accept a habit/task/project suggestion as a trackable goal.
- The user can authenticate, making the journal secure.
