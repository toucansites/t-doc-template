# Toucan Static Site Generator: Quick Installation Guide

Toucan is a Swift-based static site generator designed for simplicity and performance. This guide walks you through the installation process and helps you get started with creating your first static website.

---

## Disclaimer

Toucan product is currently in its beta phase, which means you might encounter issues if you attempt to custom modify the template using Toucan. While we’re actively refining and improving the experience, some features may be unstable or require manual adjustments. T-Doc template is fully operational as is! We appreciate your flexibility as we work towards a more polished version! 🚀

## Prerequisites

Before installing Toucan, ensure your environment is properly set up:

1. **Install Swift**:

   - Toucan requires Swift to be installed on your machine.
   - [Download Swift](https://swift.org/download/) and follow the installation instructions for your operating system.

2. **Verify Swift Installation**:

   - Open a terminal and type:

     ```
     swift --version
     ```

   - You should see the installed Swift version. If not, check for installation errors to ensure Swift is correctly set up.

---

## Installation Steps

### Step 1: Clone the Repository

1. Open your terminal.
2. Clone the Toucan repository:

   ```
   git clone https://github.com/toucansites/toucan.git
   cd toucan
   ```

### Step 2: Build and Install Toucan

1. Use `make` to build and install Toucan:

   ```
   make install
   ```

   - This command compiles the Toucan source code and installs it on your system.

2. Verify the installation:

   ```
   which toucan
   ```

   - The output should display the path where Toucan is installed. If it doesn’t, check the installation logs for errors.

---

## Getting Started with Toucan

### Step 1: Initialize a New Site

1. Create a new site by running:

   - Run the following command in your terminal, replacing **my-site** with your desired project folder name:

   ```
   toucan init my-site
   ```

   - Toucan will generate a folder with your chosen name, including default configuration files and templates.

2. Navigate to your new site folder:

   ```
   cd my-site
   ```

Once your site is initialized, your project will have the following structure:

```
my-site/
├── LICENSE            # License file for the project
├── Makefile           # Makefile for building and managing the project
├── README.md          # Project README file
├── docs/              # Folder containing generated static files (HTML, CSS, etc.)
└── src/               # Source files for content and templates
```

---

### Step 2: Generate Your Site

1. Run the following command to generate the static files:

   ```
   toucan generate
   ```

   - Toucan processes your content and templates, producing static HTML files in the `docs` directory.

### Step 3: Watch for changes (only for macOS for now)

The watch command monitors a source directory for changes and automatically regenerates the site whenever changes are detected.

1. Run the following command to enable file watching:

   ```
   toucan watch
   ```

### Step 4: Serve Your Site Locally

1. Start a local development server:

   ```
   toucan serve
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

   - This allows you to preview your site locally.

---

## Copy Theme and Default Contents

1.  Delete all files from the **my-site/src/themes/default** folder and from the **my-site/src/contents** folder.

2.  Copy all files from the **t-doc-theme/theme** folder in the ZIP file and paste them into the **my-site/src/themes/default** folder.

3.  Copy all files from the **t-doc-theme/contents** folder in the ZIP file and paste them into the **my-site/src/contents** folder.

    After successful file copies, your project will have the following structure:

    ```
    my-site/
    ├── docs
    └── src/
        ├── contents/
        │   ├── 404
        │   ├── about
        │   ├── assets
        │   ├── authors
        │   ├── home
        │   ├── lists
        │   ├── posts
        │   ├── tags
        │   └── index.yml
        └── themes/
            └── default/
                ├── assets
                ├── templates
                └── types
    ```

4.  Once all files are successfully copied, regenerate your site to apply the changes: - First run the following command:

        ```
        toucan generate
        ```
        - After successful generation, run the following command:

    ```
    toucan serve
    ```

    The theme comes with a variety of sample content to help you quickly understand how to structure and manage your site. These include:

## Default Contents

1. Categories:
   - Multiple categories are provided in **src/contents/docs/**.
   - This demonstrates how to organize guides.
2. Guides:
   - Several sample guides are included in **src/contents/docs/categories**.
   - These showcase how to write Markdown-based guides with metadata and images.
3. 404 Page:
   - A preconfigured “Page Not Found” template is located in **src/contents/404/**.
4. About Page:
   - A sample “About” page is included in **src/contents/about/** to demonstrate static page creation.
5. Assets:
   - Default images and icons are stored in **src/contents/assets/**.
   - Includes logos, placeholders, and theme-specific assets.
6. Home Page Content:
   - A preconfigured home page setup is included in **src/contents/home/**.

You can use these sample files as a reference or starting point for your project. Once you’re familiar with the structure, replace them with your own custom content.

Happy building with Toucan!

## Troubleshooting

If you encounter any issues during installation or setup, try the following steps:

- Ensure Swift is installed and correctly configured.
- Check your `PATH` to ensure the Toucan binary is accessible.
- Review the logs for any error messages and report issues on the [Toucan GitHub Issues page](https://github.com/toucansites/toucan/issues).

---

## Resources

- **Official Repository**: [https://github.com/toucansites/toucan](https://github.com/toucansites/toucan)
- **Swift Downloads**: [https://swift.org/download/](https://swift.org/download/)
