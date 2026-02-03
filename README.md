# Senator Oluremi Tinubu Dream Centre

The **Senator Oluremi Tinubu Dream Centre** is a state-of-the-art inspiration and mentorship hub located at the Obafemi Awolowo University (OAU), Ile-Ife. Launched by Nigeria’s First Lady, it serves as a sanctuary for academic excellence, digital innovation, and character building.

---

## 🏛️ About the Project

The Dream Centre is designed to nurture the next generation of Nigerian leaders through:
- **Inspiration**: A tranquil environment for reflection and visioning.
- **Mentorship**: Access to role models and academic guidance.
- **Innovation**: High-tech facilities equipped with AI tools and digital resources.

## 🚀 Technology Stack

This website is built with a focus on premium aesthetics, performance, and accessibility:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS with a custom Design System
- **Components**: Functional React components with a focus on Semantic HTML
- **Animations**: CSS transitions and scroll-triggered effects
- **Optimization**: Next/Image for high-performance visual delivery

## 📂 Project Structure

```bash
src/
├── app/            # Next.js App Router (Layouts, Pages, Globals)
├── components/     # UI Library & Section-specific components
│   ├── sections/   # Major page sections (Hero, Philosophy, Gallery, etc.)
│   └── ui/         # Base UI components (Container, OptimizedImage, etc.)
├── content/        # JSON-based content management for easy updates
├── lib/            # Utilities, content fetchers, and image helpers
├── hooks/          # Custom React hooks (scroll tracking, etc.)
└── types/          # TypeScript definitions
```

## 🛠️ Key Features

- **Dynamic Quotes**: A randomized quote system featuring authentic statements from the Patron, Senator Oluremi Tinubu.
- **Premium Gallery Slider**: A custom-built, responsive carousel showcasing the architectural beauty of the centre.
- **Responsive Leadership Grid**: Optimized circular portraits adjusted for traditional headgear and formal aesthetics.
- **Content-First Architecture**: All text and images are managed via JSON files in `src/content/`, allowing for rapid updates without code changes.

## 👨‍💻 Development

### Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

### Updating Content

To update the text or images on the site, modify the corresponding JSON files in:
- `src/content/hero.json`: Hero text and background
- `src/content/philosophy.json`: Core text and mural images
- `src/content/stakeholders.json`: Leadership names, bios, and portraits
- `src/content/gallery.json`: Physical space images and captions
- `src/content/quotes.json`: List of inspirational quotes

---

*“A journey of a thousand miles begins with a single step.”* — Dream Centre Stairwell Mural
