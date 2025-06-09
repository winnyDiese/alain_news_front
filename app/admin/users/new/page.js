export default function NewUserPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Créer un nouvel utilisateur</h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom complet"
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            required
          />

          <select className="border p-2 rounded">
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>

          <input
            type="password"
            placeholder="Mot de passe"
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Créer l'utilisateur
          </button>
        </form>
      </div>
    </div>
  )
}
