# 1. Import the groq library
import groq
import os
#from dotenv import load_env
#load_env()

# 2. Paste your API key (between the quotes)
client = groq.Groq(api_key="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")
#or
# client = groq.Groq(api_key=os.getenv(GROQ_API_KEY)

# 3. Welcome message
print("🤖 Welcome to your AI Chatbot! Type 'exit' to stop.")

# 4. Start chat loop
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        break

    # 5. Send input to Groq
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a helpful assistant who answers in a friendly tone."},
            {"role": "user", "content": user_input}
        ]
    )

    # 6. Get the chatbot's reply
    reply = response.choices[0].message.content
    print("AI:", reply)
