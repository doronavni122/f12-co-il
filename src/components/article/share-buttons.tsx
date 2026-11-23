import { CopyLinkButton } from "@/components/article/copy-link-button";

type Props = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="שיתוף">
      <a
        className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm text-muted hover:border-brand hover:text-foreground"
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm text-muted hover:border-brand hover:text-foreground"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm text-muted hover:border-brand hover:text-foreground"
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
      </a>
      <a
        className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm text-muted hover:border-brand hover:text-foreground"
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <CopyLinkButton url={url} />
    </div>
  );
}
