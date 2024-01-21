export default function CTA() {
  return (
    <div className="mt-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-primary">
            Start your free trial today.
          </span>
        </h2>
        <div className="ml-10 mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-5 py-3 text-base font-medium text-primary-foreground"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
