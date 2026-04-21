# Setting Up New Sanity Project

## Setup Sanity Studio

### 1. Create a new Studio with Sanity CLI

Run the command in your Terminal to initialize your project on your local computer.

```sh
npm create sanity@latest -- --project xwrx4h71 --dataset production --template clean --typescript --output-path studio-cedardale-hoa-website
cd studio-cedardale-hoa-website
```

See the [documentation](https://www.sanity.io/help/cli-errors) if you are having issues with the CLI.

### 2. Run Sanity Studio locally

Inside the directory of the Studio, start the development server by running the following command.

```sh
# in studio-cedardale-hoa-website
npm run dev
```


### 3. Log in to the Studio

Open the Studio running locally in your browser from http://localhost:3333.

You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.

## Define a schema

### Create a new document type

Create a new file in your Studio’s schemaTypes folder called postType.ts with the code below which contains a set of fields for a new post document type.

```typescript
// /studio-cedardale-hoa-website/schemaTypes/postType.ts
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
```

### Register the post schema type to the Studio schema

Now you can import this document type into the schemaTypes array in the index.ts file in the same folder.

```ts
// /studio-cedardale-hoa-website/schemaTypes/index.ts
import {postType} from './postType'

export const schemaTypes = [postType]
```

### Publish your first document

When you save these two files, your Studio should automatically reload and show your first document type. Click the + symbol at the top left to create and publish a new post document.

## Querying content with GROQ

### open the vision tool

In the Studio's toolbar, next to Structure, click Vision to open a playground to test-run GROQ queries.

### Write your first GROQ query

Paste the example query below into the Query code block field.
* represents all documents in a dataset as an array
[_type == "post"] represents a filter to only return matching documents
{ _id, title, slug, publishedAt } represents a projection which defines the attributes from those documents that you wish to include in the response.

```vision
*[_type == "post"]{ _id, title }
```

### Run the query

Click Fetch to see the JSON output in Results. You should see the document you previously published in the results.
Queries run in Vision use your authenticated session, so you will see private documents – which have a . in the _id key, like drafts. – that you will not see when queried from your front end in the next step.

## Displaying Content in the Front End

### Install a new Next.js application
If you have an existing application, skip this first step and adapt the rest of the lesson to install Sanity dependencies to fetch and render content.
Run the following in a new tab or window in your Terminal (keep the Studio running) to create a new Next.js application with Tailwind CSS and TypeScript.
You should now have your Studio and Next.js application in two separate, adjacent folders:

```sh
# outside your studio directory
npx create-next-app@latest nextjs-cedardale-hoa-website --tailwind --ts --app --src-dir --eslint --import-alias "@/*" --turbopack
cd nextjs-cedardale-hoa-website
```

```sh
# output
├─ /nextjs-cedardale-hoa-website
└─ /studio-cedardale-hoa-website
```

### Install Sanity dependencies
Run the following inside the nextjs-cedardale-hoa-website directory to install:
next-sanity a collection of utilities for integrating Next.js with Sanity
@sanity/image-url helper functions to take image data from Sanity and create a URL

```sh
# in nextjs-cedardale-hoa-website
npm install --legacy-peer-deps next-sanity @sanity/image-url
```

### Start the development server
Run the following command and open http://localhost:3000 in your browser.

```sh
# in nextjs-cedardale-hoa-website
npm run dev
```

### Configure the Sanity client
To fetch content from Sanity, you’ll first need to configure a Sanity Client.
Create a directory nextjs-cedardale-hoa-website/src/sanity and within it create a client.ts file, with the following code:

```ts
// /nextjs-cedardale-hoa-website/src/sanity/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "xwrx4h71",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
```

### Display content on the homepage
Next.js uses server components for loading data at specific routes. The current home page can be found at src/app/page.tsx.
Update it to render a list of posts fetched from your Sanity dataset using the code below.

```ts
// /nextjs-cedardale-hoa-website/src/app/page.tsx
import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### Display individual posts
Create a new route for individual post pages.
The dynamic value of a slug when visiting /[slug] in the URL is used as a parameter in the GROQ query used by Sanity Client.
Notice that we’re using Tailwind CSS Typography’s prose class name to style the post’s body block content. Install it in your project following their documentation.

```ts
// /nextjs-cedardale-hoa-website/src/app/[slug]/page.tsx
import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
```

## Deploying Studio and inviting editors

### Deploy your Studio with Sanity

Back in your Studio directory (studio-cedardale-hoa-website) run the following command to deploy your Sanity Studio.

```sh
npm run deploy
```

### Invite a collaborator
Now that you’ve deployed your Studio, you can optionally invite a collaborator to your project: Invite user
They will be able to access the deployed Studio, where you can collaborate together on creating content.