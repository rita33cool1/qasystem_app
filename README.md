# Q&A system

---

## Introduction
This application implements a question and answer system, which is designed to let users can ask questions and get the answers they want more quickly. By adding expertises to questions lets system use these expertises to choose user's friends who has high priority to these and transport question to them. 

Current features:
1. Register
2. Login
3. Send question with expertises
4. Edit/Delete question
5. Question List
6. User List
7. Show/Change Profile
8. Logout
9. Personal Problem List
10. Friend List
11. Follow List
12. Friend request/confirm
13. Follow the specific user
14. Show the specific question detail
15. Show the specific user profile
16. Send/Show/Edit/Delete comment to the specific question
17. Send/Show/Edit/Delete answer to the specific question
18. Star the specific question
19. Score up/down the specific question

---

## Software Installation
相關說明 : 
https://docs.nativescript.org/start/quick-setup

1.  Install Node.js

2.  Install NativeScript tools (see http://docs.nativescript.org/start/quick-setup)
    npm install -g nativescript
    選項皆選擇(Y)es

3.  install android requirement

4.  Run in Android or iOS

```bash
tns run android
tns run ios
```

5. build apk：
If apk file is successfully built, then it will at the path "ver-x.x.x/platforms/app/build/outputs/apk/release/app-release.apk" 

```bash
tns build android --release --key-store-path my-release-key.jks  --key-store-password 123456789 --key-store-alias key_qasystem --key-store-alias-password 123456789
```

---

## Problem may occur
1. Simulation devices may broken for some reasons. The fastest and most easy way to fix it is running the instruction below.
However, you can skip most of the installation, just install the Android emulator and the following installations.

```bash
tns setup
```

---

## Contact
Any comments and questions are highly appreciated. Please address them to john98562019@gmail.com
Zong Xun-Tsai