# Piget

Static Astro site for showcasing AI generated music.

## Installation

These instructions assume:

- You are on a Mac
- You are starting from a fresh machine
- You want the easiest path with Homebrew where possible
- You want to edit content in VS Code, preview the site locally, and then push your changes to GitHub

### Step 1: Install Homebrew

Homebrew is the package manager used to install most of the tools below.

1. Open the Terminal app on your Mac.
2. Copy and paste this command, then press Enter:

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

3. Wait for the installation to finish.
4. If the installer shows extra commands to add Homebrew to your shell, copy and run them exactly as shown.
5. Close Terminal and open it again.
6. Check that Homebrew works:

    ```sh
    brew --version
    ```

    If you see a version number, Homebrew is installed correctly.

### Step 2: Install VS Code

VS Code is the recommended editor for this project.

Run:

```sh
brew install --cask visual-studio-code
```

Then open VS Code from your Applications folder.

### Step 3: Install Git

Git is what you use to download the site and send your changes back to GitHub.

Run:

```sh
brew install git
```

Check it:

```sh
git --version
```

### Step 4: Install GitHub CLI

GitHub CLI gives you a simpler sign-in flow and makes GitHub access easier from Terminal.

Run:

```sh
brew install gh
```

Check it:

```sh
gh --version
```

### Step 5: Install Node.js and pnpm

This site runs on Node.js and uses `pnpm` for dependencies and commands.

Run:

```sh
brew install node pnpm
```

Check both:

```sh
node --version
pnpm --version
```

### Step 6: Configure Git one time

Replace the example name and email with your real details.

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

You only need to do this once on your computer.

### Step 7: Sign in to GitHub with GitHub CLI

Make sure you have:

- A GitHub account
- Permission to push to [gianmarcocalbi/piget](https://github.com/gianmarcocalbi/piget)

If you do not have permission to push, ask the owner of [gianmarcocalbi/piget](https://github.com/gianmarcocalbi/piget) before continuing.

Then run:

```sh
gh auth login
```

When prompted:

1. Choose `GitHub.com`
2. Choose `HTTPS`
3. Choose `Login with a web browser`
4. Follow the browser steps to complete sign-in

When it finishes, confirm it worked:

```sh
gh auth status
```

### Step 8: Download the project

Choose where you want the project folder to live. A common place is `~/Documents`.

Run:

```sh
cd ~/Workspace
gh repo clone gianmarcocalbi/piget
cd piget
```

If `gh repo clone` does not work, make sure `gh auth login` finished successfully.

### Step 9: Install the project dependencies

Inside the project folder, run:

```sh
pnpm install
```

This may take a minute the first time.

### Step 10: Open the project in VS Code

1. Open VS Code.
2. Choose `File` -> `Open Folder...`
3. Select the `piget` folder you cloned.

### Step 11: Start the local preview site

1. Choose `View` -> `Terminal` to open a Terminal inside VS Code.
2. Run this command to start the local development server:

    ```sh
    pnpm dev
    ```

    You should see a local address that looks like this:

    ```txt
    http://localhost:4321/
    ```

3. Click on the local address in the Terminal to open the site in your browser.

Leave this Terminal window open while you work. The site updates automatically when you save changes.

### Step 12: Make content changes

See the "Content management" section below for details on how to update song
pages, the About page, and site-wide settings.

### Step 13: Review your changes locally

After each change:

1. Go back to the browser tab running the local site.
2. Refresh if needed.
3. Check the exact page you changed.
4. Confirm text, images, and links look correct.

Useful pages to review:

- Home page: `http://localhost:4321/`
- About page: `http://localhost:4321/about`
- Song pages: `http://localhost:4321/songs/the-song-slug`

The song slug is usually based on the filename. For example, `ghost-on-the-stairs.md` becomes:

```txt
http://localhost:4321/songs/ghost-on-the-stairs
```

### Step 14: Stop the preview server when you are done

In the Terminal window running `pnpm dev`, press `Ctrl` + `C`.

### Step 15: Save and push your changes

You can still use VS Code if you prefer, but the simplest command-line flow is below.

#### Option A: Push with GitHub CLI and Git

Run these commands from inside the project folder:

```sh
git status
git add .
git commit -m "Update site content"
git push
```

Notes:

- `gh auth login` from Step 7 usually takes care of authentication
- `git status` shows what changed
- `git add .` prepares all changed files
- `git commit -m` saves a snapshot with a message
- `git push` uploads the changes to GitHub

If `git push` asks for authentication again, run:

```sh
gh auth setup-git
```

Then try `git push` again.

#### Option B: Push with VS Code

This is still fine if you prefer buttons over commands.

1. In VS Code, click the Source Control icon in the left sidebar (it looks like a branch with 3 dots).
2. Review the changed files.
3. Click each file to check the changes.
4. In the message box at the top, write a short summary, for example:

```txt
Update lyrics and about page text
```

1. Click `Commit`.
2. If VS Code asks whether to stage changes, confirm.
3. Click `Sync Changes` or `Push`.
4. Wait for the upload to finish.

### Step 16: Confirm the changes are online

After pushing:

1. Open [gianmarcocalbi/piget](https://github.com/gianmarcocalbi/piget) in your browser.
2. Confirm your commit appears in the history.
3. If the site is deployed automatically, wait for the deployment to finish.
4. Open the live website and confirm the page looks correct there too.

## Content management

If you are only updating content, you usually only need to touch one of these places:

- Song pages: [src/content/songs](src/content/songs)
- About page text and site-wide settings: [src/data/site.yaml](src/data/site.yaml)

If you are only updating text, images, or links, you do not need to edit anything in [src/pages](src/pages), [src/components](src/components), or other code files.

### What to edit

Use this quick guide:

- Change lyrics, song summary, song image, or song streaming links: edit the matching file in [src/content/songs](src/content/songs)
- Change the About page text, profile image, or contact links: edit the `about:` section in [src/data/site.yaml](src/data/site.yaml)
- Change the artist name, album title, homepage intro, home page image, or album-wide platform list: edit [src/data/site.yaml](src/data/site.yaml)
- Add a new image: place it in [public/images](public/images) first, then reference it from Markdown or YAML

### Before you edit

Keep these rules in mind:

1. Do not change indentation unless you need to.
2. Do not remove the `---` lines at the top and bottom of a song file.
3. Save your file, then check the page in the browser running `pnpm dev`.

### Update a song page

Each song page is a Markdown file in [src/content/songs](src/content/songs).

- Edit the existing song file for that track, for example [src/content/songs/ghost-on-the-stairs.md](src/content/songs/ghost-on-the-stairs.md).
- The filename becomes part of the page URL, so only rename a file if you also want to change that song's web address.

At the top of each song file there is a settings block between `---` lines.

- `title`: the song title shown on the site
- `summary`: the short description shown on listings and page previews
- `order`: the track order on the songs list
- `heroImage`: the image used at the top of the song page
- `platformUrls`: links to streaming services for that song
- `lyrics`: the lyrics shown on the page

Below the second `---` line is the main page content. This is normal Markdown text and is used for the explanation or notes section of the song page.

Formatting notes:

- Keep the indentation under `platformUrls:` exactly aligned
- Keep the lyric lines indented under `lyrics: |`
- Use full links starting with `https://`

Example:

```md
---
title: Ghost on the Stairs
summary: A slow-burn opener about hearing movement in an empty house.
order: 1
heroImage: images/songs/ghost-on-the-stairs.svg
platformUrls:
  spotify: https://spotify.com
lyrics: |
  First line
  Second line
---

This paragraph appears in the song explanation section.
```

Useful Markdown examples for the body of a song page:

- Paragraph text: just type normally
- Bold text: `**important text**`
- Link: `[Listen on Spotify](https://spotify.com)`
- New section title: `## Behind the song`

### Add a new song

If you want to add a completely new song page:

1. In [src/content/songs](src/content/songs), duplicate an existing song file.
2. Rename the new file using lowercase letters and hyphens, for example `new-song-title.md`.
3. Update the `title`, `summary`, `order`, `heroImage`, `platformUrls`, and `lyrics` fields.
4. Replace the body text below the second `---` line.
5. Add the matching artwork file to [public/images/songs](public/images/songs).
6. Save the file and open the new page in the browser.

Example URL:

- `new-song-title.md` becomes `http://localhost:4321/songs/new-song-title`

### Update the About page

The About page text does not live in a page file. It is managed in [src/data/site.yaml](src/data/site.yaml).

Open the `about:` section and update these fields:

- `avatar`: image shown on the About page
- `project`: a list of paragraphs about the project
- `author`: a list of paragraphs about the artist or author
- `contact`: a list of contact cards with `label`, `value`, and `href`

Important:

- `about.author` is the About page paragraph list
- top-level `author` is the site or artist name shown across the website

Example:

```yaml
about:
  avatar: images/about/piget-avatar.svg
  project:
    - First paragraph about the project.
    - Second paragraph about the project.
  author:
    - First paragraph about the author.
    - Second paragraph about the author.
  contact:
    - label: Email
      value: hello@example.com
      href: mailto:hello@example.com
```

Each `-` line becomes a separate paragraph on the About page.
Each item under `contact` becomes a linked contact card.

### Update site-wide settings

The same file, [src/data/site.yaml](src/data/site.yaml), also controls the main site details.

- `author`: the site or artist name
- `albumTitle`: the album title shown across the site
- `homepageIntro`: the intro paragraph shown on the home page
- `homepageBackground`: the main background artwork used on the home page
- `links`: the list of album-wide streaming platforms shown on the home page

Change these only if you want to affect the whole site, not just one song.

Example:

```yaml
author: Piget
albumTitle: The Rise and Fall of a Ghost
homepageIntro: Songs, lyrics, and notes arranged as a focused digital release.
homepageBackground: images/home/ghost-album-background.svg
links:
  - id: spotify
    title: Spotify
    icon: simple-icons:spotify
```

If you add a new platform under `links`, use the same `id` inside the song file's `platformUrls` section so song pages can reuse the platform title and icon.

Example:

```yaml
links:
  - id: bandcamp
    title: Bandcamp
    icon: simple-icons:bandcamp
```

```md
platformUrls:
  bandcamp: https://example.bandcamp.com
```

### Images and file paths

- Song artwork usually lives in [public/images/songs](public/images/songs)
- About page images usually live in [public/images/about](public/images/about)
- Home page artwork usually lives in [public/images/home](public/images/home)

Typical workflow:

1. Add the image file to the correct folder inside [public/images](public/images)
2. Reference it without the `public/` part

When you reference an image in Markdown or YAML, use the path without `public/` at the start.

- Correct: `images/songs/ghost-on-the-stairs.svg`
- Not correct: `public/images/songs/ghost-on-the-stairs.svg`

### Safe editing checklist

1. Update the relevant file in [src/content/songs](src/content/songs) or [src/data/site.yaml](src/data/site.yaml).
2. Keep the `---` lines and indentation exactly as they are.
3. Check that any links start with `https://`.
4. Check that image paths point to a real file inside [public/images](public/images).
5. Save the file.
6. Check the local preview site in your browser.
7. Make sure the edited page still looks correct on the site.

## Troubleshooting

### `brew` command not found

Homebrew did not finish installing, or Terminal needs to be restarted. Close Terminal, open it again, and run:

```sh
brew --version
```

### `pnpm` command not found

Install it again with:

```sh
brew install pnpm
```

### `gh` command not found

Install it again with:

```sh
brew install gh
```

### `gh repo clone` or `git push` asks you to sign in

Run these commands:

```sh
gh auth login
gh auth setup-git
```

Then try again.

### `git push` says you do not have permission

You do not have write access to [gianmarcocalbi/piget](https://github.com/gianmarcocalbi/piget). Ask its owner to grant access.

### The local site does not open

Check the Terminal where `pnpm dev` is running and look for the local address shown there. It may be different if port `4321` is already in use.

### The page looks broken after editing

Most content issues come from:

- YAML indentation being changed in [src/data/site.yaml](src/data/site.yaml)
- Missing `---` lines in a song Markdown file
- A missing image file or wrong image path
- A broken `https://` link
