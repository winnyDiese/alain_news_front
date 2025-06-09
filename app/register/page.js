const SignUpPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left: Sign Up Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-white p-8 shadow-md">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">
              Already have an account? <a href="#" className="text-blue-600">Log in</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Description */}
      <div className="hidden md:flex w-3/5 bg-blue-50 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Join Our Platform</h1>
          <p className="text-lg text-gray-600">
            Sign up today to access your dashboard, manage data, track progress, and explore all our features. Quick, secure and simple.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
