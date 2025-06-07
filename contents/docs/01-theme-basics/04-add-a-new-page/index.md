---
type: guide
category: theme-basics
slug: theme-basics/add-a-new-page
title: 'Add a custom page'
description: 'This guide will walk you through how to create a custom page and add it to the navigation menu'
order: 4
---

# Create a Custom Page in Navigation

Adding a custom page is a great way to enhance your site’s functionality by including pages like ‘Contact Us,’ ‘FAQ,’ or other static content. Follow the steps below to create a custom page and add it to the navigation menu in **T-Doc Theme**.

---

### Step 1: Edit the Navigation Menu

1. Open the **src/site.yaml** file in your project directory.

   - This file `navigation` section manages the navigation menu displayed on your site.

2. Add a new entry under the `navigation` section for your custom page. Example:

```yaml
navigation:
  - label: 'Docs'
    url: '/docs/'
  - label: 'About'
    url: '/about/'
  - label: 'Contact'
    url: '/contact/'
  - label: FAQ
    url: '/faq/'
```

**Fields Explanation**:

- **label**: The text displayed in the navigation menu.
- **url**: The relative URL of the custom page.

---

### Step 2: Create the Custom Page Directory

1. Navigate to the **src/contents/** folder.
2. Create a new directory for your custom page. For example:

```bash
mkdir src/contents/faq
```

---

### Step 3: Add an `index.md` File

1. Inside the new directory (e.g., `src/contents/faq`), create a file named `index.md`.

   - This file contains the metadata and content for the custom page.

2. Add the following content to the `index.md` file:

   ```
   ---
   title: "FAQ"
   description: "Frequently asked questions"
   template: pages.default_page
   ---
   ```

   **Fields Explanation**:

   - **title**: The title of the custom page.
   - **description**: A short description or summary of the page's content.
   - **template**: The Mustache template used to render the page.

---

### Step 4: Add Content to the Page

Below the metadata in `index.md`, write the content of your custom page using Markdown. Example:

```
## FAQ

### How do I reset my password?
If you forgot your password, you can reset it by clicking the "Forgot Password" link on the login page.

### How can I contact support?
You can reach our support team at [support@example.com](mailto:support@example.com).
```

---

### Step 5: Create a New Template (Optional)

1. If the default template `pages.default_page` does not fit your needs, create a custom Mustache template:
   - Navigate to **src/themes/default/templates/pages/**.
   - Create a new Mustache file, e.g., `faq.mustache`.
2. Update the `template` field in the custom page's metadata to use your new template:

   ```
   template: pages.faq
   ```

---

### Step 6: Regenerate the Site

Once the custom page is created, regenerate the site to apply the changes:

1. Open your terminal and navigate to your project directory.
2. Run the following command:

   ```
   toucan generate
   ```

3. This updates the site’s content and refreshes the navigation menu.

---

### Step 7: Verify the Custom Page

1. Start the local development server:

   ```
   toucan serve
   ```

2. Open your browser and go to [http://localhost:3000/faq/](http://localhost:3000/faq/).
3. Ensure that the custom page is displayed correctly and can be accessed from the navigation menu.

---

### Additional Notes

- **Updating Content**:
  - You can edit the `index.md` file at any time to update the content of the custom page.
- **Styling**:
  - Update the relevant Mustache templates and CSS files in the **themes/default/** directory to customize the page's look.

---

This guide will help you create and manage custom pages easily in **T-Doc Theme**.
