## Getting Started

1. copy the contents of `.env.example` into `.env`, adding secrets and keys where appropriate.

2. Install necessary dependencies with the command:

```bash
npm install
```

This also generates the Prisma client with reference to `prisma/schema.prisma`.

3. To start the local development server, run the command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

only code committed on the `main` branch will be deployed to Vercel. You can check out the deployed application at [http://chatbot.pgabriel.dev](https://chatbot.pgabriel.dev).

## Tech Stack and links

1. [NextJS](https://nextjs.org/docs/app/getting-started) as an SSR application.
2. [Mantine](https://mantine.dev/) for CSS library
3. [Prism](https://www.prisma.io/docs/orm/overview/introduction) as an ORM and managed Postgres DB solution
4. [Clerk](https://clerk.com/docs/quickstarts/nextjs) for authentication
5. [AI SDK](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router) for easy interfacing with LLMs

## Things I would like to do with time

##### Workflow
- Unit tests
- Github actions for triggering linting, tests and scans
- Multiple environments

##### Features
- Pagination of chat history. We look at implementing a reversed endless scroll behaviour, and retrieve the next batch of messages when the scroll reaches the top.
- Cleaning up of chats
- Attachments
