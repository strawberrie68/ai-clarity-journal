# Clarity

![Clarity](https://github.com/user-attachments/assets/86d34cf9-65cb-4574-a1c9-5dfd5adb2df9)

## 📑 Table of Contents

- [What is Clarity](#what-is-clarity)
- [Features](#features)
- [Tech Stack](#-tech-stack)
- [Mockups](#mockups)
- [Future Improvements And Reflections](#future-improvements-and-reflections)
  - [Using `clsx` to Organize Tailwind Classes](#1-using-clsx-to-organize-tailwind-classes)
  - [Adding Comprehensive User Feedback](#2-adding-comprehensive-user-feedback)
- [What I Learned](#what-i-learned)
  - [Picking Wrong Framework](#picking-wrong-framework) -[Lessons on Accessibility, Speed & UI Libraries](#2-lessons-on-accessibility-speed--ui-libraries)
- [Conclusion](#conclusion)

&nbsp;

🧠 TL;DR

> This is my final capstone project, built in just 1.5 weeks during a fast-paced web development bootcamp. I challenged myself to learn Next.js from scratch — aiming to create a fast, SEO-friendly, and scalable journaling app powered by OpenAI. Along the way, I explored best practices in accessibility, leaned into smarter workflows with component libraries like Radix UI, and learned how to balance speed with thoughtful design decisions. While I’ve continued to grow as a developer since, this project reflects both my technical skills and my ability to adapt, learn fast, and build with purpose.

&nbsp;

# What is Clarity

📓🧠 AI-powered Journal

Clarity is your AI-powered mental clarity companion. Designed for people who want more than a basic journal, Clarity acts as both a reflective tool and a gentle therapist — using AI to help you untangle your thoughts and build healthier habits.

Built with React, Next.js, and OpenAI, this project was my BrainStation capstone. Since then, I’ve grown significantly as a developer and designer — and I’m excited to share what I’ve learned and what I’d improve.

![clarity (1)](https://github.com/user-attachments/assets/8c987d89-1428-4d6b-b22f-371192cc7d5d)

 <a href="https://clarity-lime.vercel.app/login" target="_blank">
<kbd> <br> 🛁 Project Link <br> </kbd></a>

#### ✨ Why Clarity

- Clarity is for journalers who find traditional ones insufficient for clearing their minds. It is powered by a custom AI agent whose directive is to be a friend and therapist, offering helpful feedback while revealing underlying issues, and helping to create actionable healthy habits.

&nbsp;

## 🧑‍💻 Who should use Clarity:

**📝 Journal users:**

- Looking for a private therapist and friend to talk with.
- Wanting a way to create healthier habits tailored to their goals.

## Features

- As a user, I want to have a place to write my journal entries.
- As a user, I want to have a look back at my past journal entries.
- As a user, I want to talk to an empathetic friend who talks objectively, helping me gain clarity.
- As a user, I want a summarized entry that affirms my issues.
- As a user, I want to see inspirational quotes on the dashboard to help with my issues.
- As a user, I want suggestions on how I can face such issue(s).
- As a user, I want to be able to accept a habit/task/project suggestion as a trackable goal.
- As a user, I want to be able to authenticate, making the journal secure.

---

&nbsp;

## 👾 Tech Stack

- **Client:** React, Next.js, TailwindCSS, RadixUI
- **Server:** Next.js, MongoDB
- **API:** OpenAI(3.5 Turbo)

💅 Why I Chose Tailwind CSS?

> - I chose Tailwind because it gave me the flexibility to create a fully custom UI without the visual limitations that often come with traditional UI component libraries like Bootstrap. While libraries like Bootstrap are great for quickly building layouts, they tend to have a signature look — once you’ve seen a few Bootstrap apps, you can usually tell. I didn’t want Clarity to feel generic or templated. Tailwind’s utility-first approach allowed me to design freely, fine-tune styling directly in the markup, and ensure the app looked and felt unique. It gave me the control to build something that stands out while still maintaining consistency and responsiveness.

[Why I chose Next.js?](#1-picking-wrong-framework)

---

&nbsp;

### Mockups

|                                                    Dashboard                                                    |                                                    Explore                                                    |                                                Conversation                                                |                                                    Summary                                                    |                                                     Archive                                                     |
| :-------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/strawberrie68/ai-clarity-journal/blob/develop/mockups/dashboard.svg" width="200"/> | <img src="https://github.com/strawberrie68/ai-clarity-journal/blob/develop/mockups/explore.png" width="200"/> | <img src="https://github.com/strawberrie68/ai-clarity-journal/blob/develop/mockups/chat.svg" width="200"/> | <img src="https://github.com/strawberrie68/ai-clarity-journal/blob/develop/mockups/summary.png" width="200"/> | <img src="https://github.com/strawberrie68/ai-clarity-journal/blob/develop/mockups/pastEntry.svg" width="200"/> |

---

&nbsp;

## Future Improvements And Reflections

### 🛠️ Things I would Improve

This project was my BootCamp capstone, built in just 1.5 weeks under a tight deadline. While I continued to tweak and add features after graduating, the core was developed during an intense sprint where I had to balance ambition with practicality. Since then, I’ve grown significantly — not just in my technical skills, but also in how I approach architecture, accessibility, and maintainability.

If I had the chance to revisit this project today, here are the changes I would make — and why they’d make the experience better for both users and developers.

---

&nbsp;

### 1. Using `clsx` to Organize Tailwind Classes

Now that I'm more familiar with tools like clsx, I'd refactor some of the longer Tailwind class strings for better readability.

**Before:**

```jsx
<div className="flex items-center justify-between px-4 py-2 bg-white text-sm rounded-lg shadow-md hover:bg-gray-50 transition duration-200">
```

**After:**

```tsx
import clsx from "clsx";

const cardStyles = clsx(
  "flex items-center justify-between",
  "px-4 py-2",
  "bg-white text-sm rounded-lg shadow-md",
  "hover:bg-gray-50 transition duration-200"
);

<div className={cardStyles}>
```

#### Why It’s Better:

- Cleaner and more readable.
- Easier to manage when styles get complex.
- Helps with reusability and debugging.

---

&nbsp;

## 2. Adding Comprehensive User Feedback:

**📮 Always give feedback to users**

During the development of Clarity, I focused on getting core features working and only included essential states (like active states). Looking back, I realize how much more important user feedback is for creating a smooth and trustworthy experience.

🎯 Going forward, I’ll always aim to:

- Implement hover, selected, and loading states
- Show clear success/error messages
- Provide visual confirmation that something is happening

Users often interpret the absence of feedback as something being broken — I now see this as a fundamental part of good UX. This ties in closely with usability heuristics like Visibility of System Status.

I would also like to add tests to ensure that these states and flows are working as expected.

---

&nbsp;

## What I Learned

### 1. Picking Wrong Framework

**🧠 Why I Chose Next.js — And What I’d Do Differently**

Clarity was my final BootCamp capstone, built in just 1.5 weeks. At that point, I wanted more than just to build another React app — I wanted to challenge myself. I had heard great things about Next.js: better performance, faster routing, and built-in SEO compared to traditional React apps, which struggled with server-side rendering at the time.

So I jumped in, determined to learn a new framework on the fly while building a full-stack AI-powered journaling tool.

But I quickly realized something: while Next.js is powerful, it’s not always the best choice for apps with a lot of client-side state changes — like Clarity.

My app constantly updates journal entries, summarizes them using AI, tracks goals, and handles tasks. The deeper I got, the more complex my API structure became. Every major feature — `journal`, `task`, `goal`, `user` — needed its own API folder, and each of those had subfolders for `add`, `edit`, `delete`, and `get`. It worked, but it got messy fast.

If I were to rebuild this project today, I’d:

- Use React with modern tools that now support SEO much better.
- Simplify the backend using Firebase or a cleaner Express setup.
- Plan the folder and route structure earlier to avoid deeply nested APIs.
- Focus on accessibility and maintainability from the start.

Choosing Next.js wasn’t a mistake — it was a calculated risk to learn under pressure. I came away with a deeper understanding of full-stack architecture, framework trade-offs, and the importance of matching tools to a project’s real needs.

---

&nbsp;

### 2. Lessons on Accessibility, Speed & UI Libraries

#### 💡 How using Radix UI taught me about inclusive design — even when I didn’t realize it at first.

While building Clarity, I used Radix UI for several components — mainly because it helped me move faster during a tight 1.5-week timeline. At the time, I didn’t fully realize how much it was doing behind the scenes. But looking back, I now appreciate how much accessibility Radix UI handles for free — things like ARIA attributes, keyboard support, and focus management.

This experience taught me that picking the right UI library isn’t just about speed — it’s also about building better, more inclusive experiences without reinventing the wheel. If I were to take on a similar project again, I’d lean even more intentionally on tools like this.

## Conclusion

### ✨ My final thoughts

This project was more than just a capstone — it was a challenge I set for myself to step outside of what I knew and build something more ambitious. Choosing Next.js, diving into component libraries like Radix UI, and working within a tight 1.5-week deadline pushed me to problem-solve quickly and thoughtfully. While I’ve continued to learn and grow as a developer since then, this app remains a snapshot of my grit, curiosity, and passion for building meaningful, user-focused experiences.

There’s still so much I’d refine and improve, but that only excites me — because every project is a chance to get better.
