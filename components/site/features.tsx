"use client"

export const Features = () => {
  return (
    <section>
      <div className="font-geist relative mx-auto my-32 rounded-none md:w-full md:border-[1.2px] xl:w-4/5 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-plus absolute left-[-17px] top-[-17px] size-8 text-white/30"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        <div className="grid w-full grid-cols-1 md:grid-cols-3 md:grid-rows-5">
          <div className="flex flex-col items-center justify-center p-10  ">
            <div className="flex items-center justify-center rounded-full border-2 px-8 py-3 shadow dark:[border:0.5px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-rabbit mx-auto size-7"
              >
                <path d="M13 16a3 3 0 0 1 2.24 5"></path>
                <path d="M18 12h.01"></path>
                <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"></path>
                <path d="M20 8.54V4a2 2 0 1 0-4 0v3"></path>
                <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"></path>
              </svg>
            </div>
            <div className="mt-10">
              <h2 className="text-center text-lg font-bold">Goodbye bad performance</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                We are constantly tweak firefox&apos;s engine and settings to make it faster than ever.
                <a className="text-gray-50" href="https://docs.arc-browser.app/benchmarks" target="_blank" rel="noreferrer">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="relative flex transform-gpu flex-col items-center  justify-center p-16 md:border-l-[1.2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-plus absolute bottom-[-17px] left-[-17px] size-8 text-white/30"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <div className="flex items-center justify-center rounded-full border-2 px-8 py-3 shadow">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto size-7"
              >
                <path
                  d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="mt-10">
              <h2 className="text-center text-lg font-bold">Privacy first</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                We don&apos;t track you. We don&apos;t sell your data. We don&apos;t even know who you are.
                <a className="text-gray-50" href="/privacy-policy">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="relative flex flex-col items-center  justify-center p-16 md:border-l-[0.2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-plus absolute bottom-[-17px] left-[-17px] size-8 text-white/30"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <div className="flex items-center justify-center rounded-full border-2 px-8 py-3 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-shield-check mx-auto size-7"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <div className="mt-10">
              <h2 className="text-center text-lg font-bold">Secure by default</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                We are always using the latest security features from Firefox to keep you safe.
                <a className="text-gray-50" href="https://docs.arc-browser.app/faq#how-do-i-know-arc-is-safe">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-10  ">
            <div className="flex items-center justify-center rounded-full border-2 px-8 py-3 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-rabbit mx-auto size-7"
              >
                <path d="M13 16a3 3 0 0 1 2.24 5"></path>
                <path d="M18 12h.01"></path>
                <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"></path>
                <path d="M20 8.54V4a2 2 0 1 0-4 0v3"></path>
                <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"></path>
              </svg>
            </div>
            <div className="mt-10">
              <h2 className="text-center text-lg font-bold">Goodbye bad performance</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                We are constantly tweak firefox&apos;s engine and settings to make it faster than ever.
                <a className="text-gray-50" href="https://docs.arc-browser.app/benchmarks" target="_blank" rel="noreferrer">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col  items-center justify-center p-10 md:border-l-[1.2px] md:border-t-[1.2px]  ">
            <div className="flex items-center justify-center rounded-full border-2 px-8 py-3 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-rabbit mx-auto size-7"
              >
                <path d="M13 16a3 3 0 0 1 2.24 5"></path>
                <path d="M18 12h.01"></path>
                <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"></path>
                <path d="M20 8.54V4a2 2 0 1 0-4 0v3"></path>
                <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"></path>
              </svg>
            </div>
            <div className="mt-10">
              <h2 className="text-center text-lg font-bold">Goodbye bad performance</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                We are constantly tweak firefox&apos;s engine and settings to make it faster than ever.
                <a className="text-gray-50" href="https://docs.arc-browser.app/benchmarks" target="_blank" rel="noreferrer">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="relative flex  transform-gpu flex-col items-center  justify-center p-10 md:border-l-[1.2px]  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-plus absolute bottom-[-15px] right-[-15px] size-8 text-white/40"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <div className="flex items-center justify-center rounded-full border-2 px-8 py-3 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-rabbit mx-auto size-7"
              >
                <path d="M13 16a3 3 0 0 1 2.24 5"></path>
                <path d="M18 12h.01"></path>
                <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"></path>
                <path d="M20 8.54V4a2 2 0 1 0-4 0v3"></path>
                <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"></path>
              </svg>
            </div>
            <div className="mt-10">
              <h2 className="text-center text-lg font-bold">Goodbye bad performance</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                We are constantly tweak firefox&apos;s engine and settings to make it faster than ever.
                <a className="text-gray-50" href="https://docs.arc-browser.app/benchmarks" target="_blank" rel="noreferrer">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="scrollarea relative row-span-4 hidden flex-col p-16 md:block md:border-t-2">
            <div className="min-h-[216px]">
              <div className=" ">
                <h2 className="text-3xl font-bold">User experience comes first</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We are always looking for ways to make your experience better. Always looking for feedback and
                  suggestions!
                </p>
              </div>
            </div>
          </div>
          <div className="relative row-span-2 border-t-2 dark:[border:0.5px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] md:col-span-2  md:grid md:grid-cols-2 md:border-l-[1.2px]">
            <div className="left-0 top-0 flex h-full flex-col p-16 md:absolute md:px-10">
              <div className="">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold tracking-tight">Grow with us.</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We are always looking for ways to make your experience better. With stackable emes that can be mixed
                    and matched, you can create a browser that is truly yours.
                    <a className="text-gray-50" href="https://docs.arc-browser.app/themes-store/themes-marketplace">
                      Learn more
                    </a>
                  </p>
                </div>
                <a href="/download">
                  <button className="ml-auto mt-4 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full bg-primary p-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Download Worker AI now!
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="relative row-span-2 grid-cols-2 md:col-span-2 md:grid">
            <div className="left-0 top-0 flex size-full flex-col p-16 dark:[border:0.02px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] md:absolute md:px-32">
              <div className="flex flex-col md:flex-row">
                <div className="relative">
                  <h2 className="text-3xl font-bold">Email Gen coming soon!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Create your own personalised emails with our Email Gen feature.
                  </p>
                  <div className="absolute right-0 top-[-10px] rotate-[10deg] rounded-md bg-blue-600 p-1 px-2 text-xs text-white">
                    Killer feature
                  </div>
                </div>
                <a href="/download">
                  <button className="ml-4 mt-4 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full bg-primary p-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Take a tour!
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-16">
            <div className="flex items-center justify-center rounded-full border-2 px-8 py-3 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-github size-8"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <h2 className="ml-4 text-lg font-bold">Open</h2>
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Worker AI is open source and always will be. You can check out the source code on our
              <a className="text-gray-50" href="https://github.com/Worker AI-browser">
                Github
              </a>
              !
            </p>
          </div>
          <div className="flex flex-col items-center  justify-center p-16 md:border-l-[1.2px] md:border-t-2">
            <div className="flex items-center justify-center rounded-full border-2 p-8 py-3 shadow-md">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
              >
                <path
                  d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h2 className="ml-4 text-lg font-bold">Updated</h2>
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              We are always working on new features and improvements. You can expect regular updates to keep your
              browser up to date.
            </p>
          </div>
          <div className="flex flex-col p-16  md:border-l-[1.2px]  md:border-t-2">
            <div className="flex items-center justify-center rounded-full border-2 p-8 py-3 shadow-md">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
              >
                <path
                  d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h2 className="ml-4 text-lg font-bold">Community</h2>
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Worker AI is built by a community of passionate developers and designers. You can join us on our
              <a className="text-gray-50" href="https://discord.gg/nnShMQzR4b">
                Discord
              </a>
              !
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
