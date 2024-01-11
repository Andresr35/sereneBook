# Serene Book

The Odin Project: OdinBook

Test User:

- email: user@gmail.com
- password: password

## Description

This project was meant as practice for creating full stack apps. This app is a copy of a social media app, similar to facebook or twitter. It allows you to create an account, send a message to other users privately, and share posts with friends.

## Project Overview

### Tech stack

![Static Badge](https://img.shields.io/badge/react-m?style=for-the-badge&logo=react&labelColor=black&color=%2361DAFB) ![Static Badge](https://img.shields.io/badge/node.js-m?style=for-the-badge&logo=nodedotjs&labelColor=black&color=%23339933) ![Static Badge](https://img.shields.io/badge/mongoDB-m?style=for-the-badge&logo=mongodb&labelColor=black&color=%2347A248) ![Static Badge](https://img.shields.io/badge/mongoose-m?style=for-the-badge&logo=mongoosedotws&labelColor=black&color=%23F04D35) ![Static Badge](https://img.shields.io/badge/express-m?style=for-the-badge&logo=express&labelColor=black&color=black) ![Static Badge](https://img.shields.io/badge/vite-m?style=for-the-badge&logo=vite&labelColor=black&color=%23646CFF) ![Static Badge](https://img.shields.io/badge/vercel-m?style=for-the-badge&logo=vercel&labelColor=black&color=%23000000) ![Static Badge](https://img.shields.io/badge/railway-r?style=for-the-badge&logo=railway&labelColor=black&color=%230B0D0E)

This uses React in the frontend, with an express and node backend. The database being used is a MongoDB database, being connected with Mongoose. Bcryptjs is also being used in conjunction with JWT tokens to provide authentication to users when they log in.

### Core Features

- Users profiles: Add user information to share with friends.
- Posts: Enable users to create, publish, and interact with posts.
- Friends: Implement the ability for users to follow others.
- Likes: Allow users to express interest in posts by liking them.
- Messaging: Allow users to message friends.

### Authentication

Authentication mechanisms being used include JWT and BcryptJS. Tokens are sent back and forth and required constantly for further security.

### Pages

The home page had functionality for messaging and posting. It allows you to create your own posts, manage your own posts, and interact with others posts, such as commenting and liking. It also allows for messaging new friends or open chats with old friends.
![Home Page](image.png)

The profile page allows for you to see your own profile details and posts. Here you are also allowed to make your own posts and interact with your own posts.

![Profile](image-1.png)

The friends page allows you to manage your current friends, by managing friend requests, sending new requests, and seeing your current friends.

![Friends](image-3.png)

## Project Scope

### Backend Emphasis

- Prioritize backend functionalities and data management.
- Frontend and styling efforts are flexible and secondary in importance as this project was meant to learn express, nodejs, and mongoDB.
