import Header from '@/components/header';


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Footer />

    </>
  );
}
function Hero() {
  return (
    <header className="text-center py-20 bg-gradient-to-r from-blue-200 to-blue-400">
      <h1 className="text-5xl font-extrabold text-blue-800">Build Your AI-Powered Resume</h1>
      <p className="mt-4 text-lg text-blue-700">Create professional resumes with our drag-and-drop editor and AI assistant.</p>
      <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-100 transition-colors duration-300">Get Started</button>
    </header>
  );
}

function Features() {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Why Choose NextGenResume?</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-8">
        {/* Feature 1: AI-Powered Writing */}
        <div className="bg-white p-6 shadow-md rounded-lg w-64 cursor-pointer transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-semibold">AI-Powered Writing</h3>
          <p className="mt-2 text-gray-600">Generate resumes instantly with AI assistance.</p>
        </div>

        {/* Feature 2: Customizable Templates */}
        <div className="bg-white p-6 shadow-md rounded-lg w-64 cursor-pointer transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-lg border-dotted border-gray-500">
          <h3 className="text-xl font-semibold">Customizable Templates</h3>
          <p className="mt-2 text-gray-600">Choose from a variety of modern resume templates.</p>
        </div>

        {/* Feature 3: Export to PDF/Docx */}
        <div className="bg-white p-6 shadow-md rounded-lg w-64 cursor-pointer transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-semibold">Export to PDF/Docx</h3>
          <p className="mt-2 text-gray-600">Download your resume in multiple formats.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm flex items-center gap-2">
            Made with <span className="animate-pulse">💻</span> and ❤️ by
            <a
              href="https://github.com/deva016"
              target="_blank"
              rel="noopener noreferrer" // Important for security
              className="text-green-300 font-semibold hover:text-green-400 transition-colors"
            >
              Deveshwar
            </a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          <span className="text-gray-500">&copy; {new Date().getFullYear()} NextGenResume</span>
        </div>
      </div>
    </footer>
  );
}
