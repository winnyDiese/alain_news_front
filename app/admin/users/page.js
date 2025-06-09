const Dash = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Titre */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Liste des utilisateurs</h1>
      </header>

      {/* Tableau des utilisateurs */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Nom</th>
              <th className="py-2">Email</th>
              <th className="py-2">Rôle</th>
              <th className="py-2">Date d'inscription</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Alice Martin</td>
              <td className="py-2">alice@example.com</td>
              <td className="py-2">Admin</td>
              <td className="py-2">2025-05-01</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Jean Dupont</td>
              <td className="py-2">jean.dupont@example.com</td>
              <td className="py-2">Utilisateur</td>
              <td className="py-2">2025-04-21</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Fatima B.</td>
              <td className="py-2">fatima.b@example.com</td>
              <td className="py-2">Éditeur</td>
              <td className="py-2">2025-06-01</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Louis R.</td>
              <td className="py-2">louisr@example.com</td>
              <td className="py-2">Utilisateur</td>
              <td className="py-2">2025-06-08</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dash;
