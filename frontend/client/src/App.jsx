import { FaCat, FaKeyboard, FaMusic } from "react-icons/fa";

export default function CatKeyboardLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-pink-300 flex flex-col items-center justify-center text-center p-4">
  {/* Hero Section */}
  <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-lg mb-12">
    <h1 className="text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
      <FaCat className="text-purple-500" /> Cat Keyboard
    </h1>
    <p className="mt-4 text-gray-600 text-lg">
      A fun and playful keyboard that meows with every keypress!
    </p>
    <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg shadow-md mb-6">
      Try it Meow!
    </button>
  </div>

  {/* Features Section */}
  <div className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800 mb-12">
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
      <FaKeyboard className="text-4xl text-purple-500" />
      <h3 className="text-xl font-semibold mt-3">Custom Key Sounds</h3>
      <p className="text-gray-600 text-center mt-2">Each key has a unique meow sound!</p>
    </div>
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
      <FaMusic className="text-4xl text-purple-500" />
      <h3 className="text-xl font-semibold mt-3">Musical Mode</h3>
      <p className="text-gray-600 text-center mt-2">Compose your own feline symphony.</p>
    </div>
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
      <FaCat className="text-4xl text-purple-500" />
      <h3 className="text-xl font-semibold mt-3">Cat-Friendly</h3>
      <p className="text-gray-600 text-center mt-2">No cats were harmed in the making of this project</p>
    </div>
  </div>

  {/* Footer */}
  <footer className="mt-12 text-gray-700 text-sm mb-8">
    <p>Made with 🐾 by Cat Enthusiasts</p>
  </footer>
</div>
  );
}
