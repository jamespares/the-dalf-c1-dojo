
*Instructions:*
Please build an app that generates mock exams for the DALF C1 and then marks them and stores the users previous attempts. 

It should store their answers, and also any grammar mistakes or vocab errors made when attempting the paper. 

The idea is to create an app that allows the user to iteratively do past papers and become an expert in the DALF C1 and pass the exam with a 100% score. T

he app will need to use AI to mark the past papers and generate and store and accumulate feedback to build a clear user profile and support the user to pass the DALF C1 with 100% score. 

It will also need to use AI to generate the papers. 

Refer to the dalfc1-information-bank.md to understand the requirements for creating pastpapers and marking and scoring them. 

Generate transcripts then use TTS to generate the audio files.

Record the user speaking, then use AI to review the mp3 file with a system prompt based on the rubric included in the information bank. 

Ensure the system is simple and reliable. 

*Teck stack - The All-in-one Place, Ultra Simple Cloudflare Stack*

Frontend - simple as possible html/hono/kumo deployed to Cloudflare
Backend - Cloudflare D1 database with drizzle ORM and simplest possible integrated auth system
AI - Use ChatGPT in the API via AI gateway in Cloudflare (cheap, simple, centralised)



