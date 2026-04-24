import { PawPrint } from "lucide-react";

export default function NewsletterBar() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-brand-azure"
    >
      <div className="container-page flex flex-col items-start justify-between gap-5 py-7 md:flex-row md:items-center md:py-8">
        <div className="flex items-start gap-3 md:items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
            <PawPrint className="h-5 w-5" />
          </span>
          <div>
            <h2
              id="newsletter-heading"
              className="font-serif text-xl font-bold text-brand-brown"
            >
              Đăng ký nhận bản tin PetCare
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Nhận ngay kiến thức hữu ích và ưu đãi độc quyền mỗi tuần.
            </p>
          </div>
        </div>

        <form
          className="flex w-full max-w-md items-center gap-2"
          action="/api/newsletter"
          method="post"
          aria-label="Đăng ký nhận bản tin"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email của bạn
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Email của bạn"
            className="h-11 w-full rounded-md border border-transparent bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 shadow-sm focus:border-brand-teal focus:outline-none"
          />
          <button type="submit" className="btn-primary h-11 whitespace-nowrap">
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
}
