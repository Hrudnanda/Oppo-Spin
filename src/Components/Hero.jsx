import React from "react";

const Hero = () => {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">

        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        {/* NAVBAR */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">

          {/* Logo */}
          <div className="text-xl font-bold tracking-tight">
            HB<span className="text-neutral-500">.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            <a
              href="#work"
              className="text-xs uppercase tracking-[0.25em] text-neutral-400 transition hover:text-white"
            >
              Work
            </a>

            <a
              href="#about"
              className="text-xs uppercase tracking-[0.25em] text-neutral-400 transition hover:text-white"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-xs uppercase tracking-[0.25em] text-neutral-400 transition hover:text-white"
            >
              Contact
            </a>
          </div>

          {/* Menu */}
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white/30"
          >
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-3 bg-white" />
            </div>
          </button>

        </nav>

        {/* MAIN HERO */}
        <div className="relative z-10 flex flex-1 items-center px-6 py-16 sm:px-10 lg:px-16">

          <div className="mx-auto grid w-full max-w-[1450px] items-center gap-16 lg:grid-cols-2">

            {/* LEFT CONTENT */}
            <div>

              {/* Label */}
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-neutral-600" />

                <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Graphic Designer
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">

                <span className="block">
                  I Don't Design.
                </span>

                <span className="mt-2 block text-neutral-300">
                  I Create
                </span>

                <span className="mt-2 block text-neutral-500">
                  Innovation
                </span>

                <span className="mt-2 block">
                  Through Design.
                </span>

              </h1>

              {/* INTRODUCTION */}
              <div className="mt-10 flex items-start gap-4 sm:mt-12">

                <span className="mt-2 h-px w-8 shrink-0 bg-neutral-600" />

                <div>
                  <p className="text-sm text-neutral-500">
                    Hyy, I'm
                  </p>

                  <h2 className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
                    Hrudananda Biswal
                  </h2>

                  <p className="mt-2 text-sm tracking-wide text-neutral-500">
                    Graphic Designer · Visual Creator
                  </p>
                </div>

              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap items-center gap-5">

                <a
                  href="#work"
                  className="group inline-flex items-center gap-4 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] transition duration-300 hover:bg-white hover:text-black"
                >
                  Explore Work

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <span className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Based in India
                </span>

              </div>

            </div>

            {/* RIGHT VISUAL */}
            <div className="relative flex h-[450px] items-center justify-center sm:h-[550px] lg:h-[650px]">

              {/* Outer Circle */}
              <div className="absolute h-[300px] w-[300px] rounded-full border border-white/[0.07] sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]" />

              {/* Inner Circle */}
              <div className="absolute h-[220px] w-[220px] rounded-full border border-white/[0.06] sm:h-[330px] sm:w-[330px]" />

              {/* Small Accent */}
              <div className="absolute right-[15%] top-[15%] h-2 w-2 rounded-full bg-white" />

              {/* Main Graphic */}
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] sm:h-80 sm:w-80">

                {/* Large Background Text */}
                <span className="absolute text-7xl font-black tracking-[-0.08em] text-white/[0.035] sm:text-8xl">
                  HB
                </span>

                {/* Center Card */}
                <div className="-rotate-6 border border-white/15 bg-neutral-950 px-8 py-6 shadow-2xl">

                  <p className="text-[10px] uppercase tracking-[0.45em] text-neutral-500">
                    Visual
                  </p>

                  <p className="mt-2 text-3xl font-light tracking-tight">
                    Innovation
                  </p>

                  <div className="mt-4 h-px w-full bg-neutral-800" />

                  <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-neutral-600">
                    Design / Create / Inspire
                  </p>

                </div>

              </div>

              {/* Side Text */}
              <div className="absolute bottom-5 right-5 hidden text-[9px] uppercase tracking-[0.4em] text-neutral-700 sm:block">
                Ideas · Identity · Impact
              </div>

              {/* Number */}
              <div className="absolute bottom-5 left-5 text-[9px] tracking-[0.4em] text-neutral-700">
                01 — 2026
              </div>

            </div>

          </div>

        </div>

        {/* FOOTER LINE */}
        <div className="relative z-10 mx-6 flex items-center justify-between border-t border-white/[0.07] py-5 sm:mx-10 lg:mx-16">

          <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-700">
            Hrudananda Biswal
          </span>

          <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-700">
            Scroll to explore ↓
          </span>

        </div>

      </section>

    </main>
  );
};

export default Hero;