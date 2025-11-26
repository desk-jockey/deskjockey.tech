// routes/index.tsx
import { Head } from "fresh/runtime";
import ContactForm from "../islands/ContactForm.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Brian Lehrer - Full-Stack SDET</title>
        <link rel="stylesheet" href="/styles.css" />
        <meta
          name="description"
          content="Contact page for Brian Lehrer, a full-stack SDET"
        />
      </Head>

      <div class="min-h-screen bg-bg-dark font-sans">
        {/* Hero Section */}
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-dark via-bg-mid to-bg-light relative overflow-hidden">
          {/* Background blobs */}
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 left-20 w-72 h-72 bg-accent-aqua rounded-full blur-3xl">
            </div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-accent-blue rounded-full blur-3xl">
            </div>
          </div>

          <div class="relative z-10 text-center px-4">
            <div class="mb-4 text-accent-aqua text-sm font-mono">
              <a href="https://github.com/desk-jockey">@desk-jockey</a>
            </div>
            <h1 class="text-7xl font-bold mb-6 text-fg-bright">
              Brian Lehrer
            </h1>
            <div class="max-w-[200px] mx-auto mb-8">
              <img
                src="/deskjockey.svg"
                alt="Desk Jockey"
                class="w-full h-auto"
              />
            </div>
            <div class="text-4xl font-light mb-8 text-fg-mid">
              Full-Stack <span class="text-accent-green font-bold">SDET</span>
            </div>
            <p class="text-xl text-fg-light max-w-2xl mx-auto mb-12">
              Automating the hard parts. Building resilient systems. Making
              software that works when it matters.
            </p>
            <div class="flex gap-4 justify-center flex-wrap">
              <div class="badge bg-[#a7c080] text-[#272e33]">
                Test Automation
              </div>
              <div class="badge bg-[#e69875] text-[#272e33]">
                Builder Tools
              </div>
              <div class="badge bg-[#83c092ff] text-[#272e33]">
                DevOps & SRE
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-8">
          {/* <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
          {/*   <BreakThisButton /> */}
          {/*   <CICDPipeline /> */}
          {/* </div> */}

          {/* <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
          {/*   <APIPlayground /> */}
          {/*   <TechRadar /> */}
          {/* </div> */}

          <div class="mt-16">
            <ContactForm />
          </div>
        </div>

        {/* Footer */}
        <footer class="text-center py-8 text-fg-light border-t border-bg-lighter mt-16">
          <p class="font-mono text-sm">
            Los Angeles, CA | Available for opportunities
          </p>
        </footer>
      </div>
    </>
  );
}
