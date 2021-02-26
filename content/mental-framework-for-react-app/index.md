---
title: Mental Models to start a new react project
date: Fri, 26 Feb 2021 12:52:38 GMT
---

When I first started learning react, I didn't have a systematic approach to tackle a new project. Instead I was building it in an ad-hoc way. As I gained more experience later on, a mental model has developed which I think greatly improved my productivity.


1. Work on a static version of your app.

In the first step, I usually ignores all the state and backend related issue, instead build a "useless" static version. Here you have only one problems to take care: break the app into small UI components. 

2. Hard-code state into components.

First I need to make a decision about what states this app should have, and what components should the states be binded to. Then state and props values are hard coded in the component.

3. Incorporate backend code

In this step, you bring fetch backend data to replace the hard-coded state and props. 

The beauty of React is it makes this workflow possible, in each of the steps above, you only need to focus on one aspect of the app. It greatly reduces the complexity of the development and make it less error prone.