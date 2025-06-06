---
type: guide
category: theme-basics
slug: theme-basics/add-a-new-category
title: 'Add a new category'
description: 'This guide will walk you through how to add a new category'
order: 2
---

# Add a New Category

Categories are essential for organizing content in documentation websites. They help visitors find guides and enhance site navigation. Follow the steps below to add a new category in **T-Doc Theme**.

---

### Step 1: Navigate to the Docs Directory

1. Open your project directory.
2. Go to the **src/contents/docs/** folder. This folder contains all documentation content.

---

### Step 2: Create a New Category Directory

1. Create a new directory for your category:

   - Name the folder based on the category name you want to add. For example:

     ```bash
     mkdir src/contents/docs/my-new-category
     ```

   - Use lowercase letters and hyphens for consistency in folder naming.

---

### Step 3: Add an `index.md` File

1. Inside the new directory (e.g., `src/contents/docs/my-new-category`), create a file named `index.md`.

   - This file contains the metadata for the category.

2. Add the following content to the `index.md` file:

   ```yaml
   ---
   type: category
   slug: my-new-category
   title: My New Category
   description: 'A description for this category.'
   order: 1
   ---
   ```

   **Fields Explanation**:

   - **type**: Always set to `category`.
   - **slug**: A unique, URL-friendly identifier for the category.
   - **title**: The display name of the category.
   - **description**: A short description of the category.
   - **order**: Specifies the display order of categories, with lower numbers appearing first.

---

### Step 4: Regenerate the Site

Once the category is created, regenerate your site to apply the changes:

1. Open your terminal and navigate to your project directory.
2. Run the following command:

   ```
   toucan generate
   ```

3. This updates the site’s content and templates to incorporate the new category.

---

### Step 5: Verify the Category

1. Start the local development server:

   ```
   toucan serve
   ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000).
3. Go to the **Docs** page to verify that the new category appears in the left-hand documentation menu.

---

### Additional Notes

- **Using Categories in Guides**:

  - To assign a category to a guide, include it in the `category` field of the guide’s `index.md` file. Example:

    ```yaml
    category: my-new-category
    ```

---

This guide will help you easily add and manage categories in **T-Doc Theme**.
