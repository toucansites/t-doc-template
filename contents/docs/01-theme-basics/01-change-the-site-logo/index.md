---
type: guide
category: theme-basics
slug: theme-basics/change-the-site-logo
title: 'Change the Site Logo'
description: 'This guide will walk you through how to change the site logo'
order: 1
---

# Change the Site Logo

The **site logo** is one of the key elements of your site's branding. In **T-Doc Theme**, the logo is located in the `assets` folder and can be customized easily. Follow the steps below to update your site logo.

---

## Option 1: Modify the Template Instead

Instead of replacing the default `logo.png` files, you can directly modify the navigation template to use your own inline SVG or a custom image tag.

### Use a Custom Inline SVG

1. Open the navigation template file:

   ```
   src/themes/default/templates/partials/navigation.mustache
   ```

2. Locate the following block:

   ```html
   <a href="{{site.baseUrl}}/" class="logo">
     <svg ...>...</svg>
     <span>{{site.name}}</span>
   </a>
   ```

3. Replace the `&lt;svg&gt;` tag with your own custom inline SVG content.

### Use a Custom <img> Tag

If you prefer using an image file instead of inline SVG:

1. Replace the `&lt;svg&gt;` element with an image tag, like so:

   ```html
   <picture>
     <source
       srcset="{{site.baseUrl}}/images/logos/logo~dark.png"
       media="(prefers-color-scheme: dark)"
     />
     <img
       src="{{site.baseUrl}}/images/logos/logo.png"
       alt="Logo of {{site.title}}"
       title="{{site.title}}"
     />
   </picture>
   ```

2. Make sure the path matches your custom logo file and that it's placed in the correct location.

3. You may optionally add logic for dark mode by switching the image source via JavaScript or CSS.

> Tip: Keep the `alt` attribute meaningful for better accessibility.

---

## Option 2: Replace the Default Logo Files

1. Navigate to the **src/assets/images/logos/** directory in your project folder.
   - By default, this folder contains two logo files::
     - **logo.png**: The primary logo used across the site.
     - **logo~dark.png**: A variation of the logo used in dark mode (if your site supports it).

---

### Step 1: Prepare Your Custom Logos

1. **Create Your Custom Logos**:

   - Use design software like **Adobe Photoshop**, **Canva**, or **Figma** to create your custom logos.
   - Ensure the your logos align with your brand’s design.

2. **Recommended File Format**:
   - Use PNG format with a transparent background for best results.
   - If you prefer other formats (e.g., SVG or JPG), ensure that your site supports them.

---

### Step 2: Replace the Logo Files

1. Rename your custom logos to match the default logo file names:
   - `logo.png` (for the primary logo)
   - `logo~dark.png` (for the dark mode logo)
2. Copy your custom logo files into the **src/assets/images/logos/** directory.
   - Overwrite the existing `logo.png` and `logo~dark.png` files.

---

### Step 3: Regenerate the Site

After replacing the logo files, you need to regenerate your site for the changes to take effect:

1. Open your terminal and navigate to your project directory.
2. Run the following command:

   ```
   toucan generate
   ```

3. This command will process the updated assets and regenerate the site.

---

### Step 4: Preview Your Changes

1. Start the local development server to preview the updated site:

   ```
   toucan serve
   ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
3. Verify that:
   - The new logo is displayed on the site.
   - The dark mode logo (if applicable) is displayed correctly.

---

### Step 5: Troubleshooting

If the updated logo does not appear, check the following:

1. **File Naming**: Ensure that your custom files are named exactly `logo.png` and `logo~dark.png`.
2. **File Path**: Confirm the files are located in **src/assets/images/logos/**.
3. **Cache**: Clear your browser cache or use an incognito window to view the changes.

---
