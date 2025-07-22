---
type: guide
title: 'Add a new guide'
description: 'This guide will walk you through how to add a new guide.'
category: template-basics
order: 3
---

# Add a New Guide

Adding a new guide is essential to keeping your site updated with fresh content. Follow these steps to create and publish a new guide in **T-Doc Template**.

---

### Step 1: Navigate to the Proper Category Directory

1. Open your project directory.
2. Select the category for your guide, and go to the **contents/docs/my-category** folder. This folder contains all guides with the same category.

---

### Step 2: Create a New Guide Directory

1. Create a new directory for your guide:

   - Name the folder based on the guide title or a short identifier. For example:

     ```sh
     mkdir contents/docs/my-category/my-first-guide
     ```

   - Use lowercase letters and hyphens to maintain consistency in folder naming.

---

### Step 3: Add an `index.md` File

1. Inside the new directory (e.g., `contents/docs/my-category/my-first-guide`), create a file named `index.md`.

   - This file contains the metadata and content for the guide.

2. Add the following content to the `index.md` file:

   ```text
   ---
   type: guide
   category: my-category
   slug: my-category/my-first-guide
   title: "My First Guide"
   description: "This is an introduction to my first guide."
   order: 3
   ---
   ```

   **Fields Explanation**:

   - **type**: Always set to `guide`.
   - **category**: Defines the category under which this guide is grouped.
   - **slug**: A unique, URL-friendly identifier for the guide. It determines the guide’s URL path and should use lowercase letters and hyphens.
   - **title**: The title of the guide as it will appear on the site.
   - **description**: A brief description or summary of the guide.
   - **order**: Specifies the guide's display order within the category, with lower numbers appearing first.

---

### Step 4: Write the Guide Content

1. Below the metadata in `index.md`, write the full content of your guide using Markdown. Example:

   ```text
   ---
   type: guide
   category: my-category
   slug: my-category/my-first-guide
   title: "My First Guide"
   description: "This is an introduction to my first guide."
   order:
   ---

   ## Welcome to My First Guide

   This is the content of my first guide. It’s written in Markdown, so you can easily format headings, lists, images, and more.

   ### Here’s a List
   - Item 1
   - Item 2
   - Item 3
   ```

---

### Step 5: Add Images (Optional)

1. If your guide includes images, create an **assets** folder inside the guide directory:

   ```sh
   mkdir contents/docs/my-category/my-first-guide/assets
   ```

2. Place your images in the **assets** folder and reference them in your Markdown content. Example:

   ```md
   ![My Image](./assets/my-image.jpg)
   ```

---

### Step 6: Regenerate the Site

Once the guide is created, regenerate your site to apply the changes:

1. Open your terminal and navigate to your project directory.
2. Run the following command:

   ```sh
   toucan generate
   ```

3. This updates the site’s content and templates to reflect the new guide.

---

### Step 7: Verify the Guide

1. Start the local development server:

   ```sh
   toucan serve
   ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000).
3. Go to the **Docs** page to verify that the new guide appears under the correct category.

---

### Additional Notes

- **Editing Metadata**:
  - You can edit the `index.md` file at any time to update the guide's metadata or content.

---

This guide will help you easily create and manage guides in **T-Doc Template**.
