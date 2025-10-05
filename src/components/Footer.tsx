import { Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>
            Developed by [Your Name or Group Name] | Prototype for Academic Project
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span>GitHub Repository</span>
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
