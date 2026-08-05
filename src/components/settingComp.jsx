export function General({ settings, setSettings }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 ">General Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mt-4 ">
          <label className="block mb-2">Site Name:</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter site name"
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
            value={settings.siteName}
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Site URL:</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter site URL"
            onChange={(e) =>
              setSettings({ ...settings, siteUrl: e.target.value })
            }
            value={settings.siteUrl}
          />
        </div>
        <div className="mt-4 ">
          <label className="block mb-2">City</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter city"
            onChange={(e) => setSettings({ ...settings, city: e.target.value })}
            value={settings.city}
          />
        </div>
        <div className="mt-4 ">
          <label className="block mb-2">Country</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter country"
            onChange={(e) =>
              setSettings({ ...settings, country: e.target.value })
            }
            value={settings.country}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Logo Upload:</label>
          <input
            type="file"
            className="block w-full border border-gray-300 rounded shadow text-sm  text-gray-500  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) =>
              setSettings({ ...settings, logo: e.target.files[0] })
            }
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Front Pic:</label>
          <input
            type="file"
            className="block w-full border border-gray-300 rounded shadow text-sm  text-gray-500  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) =>
              setSettings({ ...settings, frontPic: e.target.files[0] })
            }
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Favicon:</label>
          <input
            type="file"
            className="block w-full border border-gray-300 rounded shadow text-sm  text-gray-500  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) =>
              setSettings({ ...settings, favicon: e.target.files[0] })
            }
          />
        </div>
      </div>
    </div>
  );
}
export function Contact({ settings, setSettings }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contact Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mt-4">
          <label className="block mb-2">Contact Email:</label>
          <input
            type="email"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter contact email"
            onChange={(e) =>
              setSettings({ ...settings, email: e.target.value })
            }
            value={settings.email}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Contact Phone:</label>
          <input
            type="tel"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter contact phone"
            onChange={(e) =>
              setSettings({ ...settings, phone: e.target.value })
            }
            value={settings.phone}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Contact Address:</label>
          <textarea
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter contact address"
            onChange={(e) =>
              setSettings({ ...settings, address: e.target.value })
            }
            value={settings.address}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
export function Payment({ settings, setSettings }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mt-4">
          <label className="block mb-2">Bank Account Name:</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter bank account details"
            onChange={(e) =>
              setSettings({ ...settings, bankAccountName: e.target.value })
            }
            value={settings.bankAccountName}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Bank Name</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter bank name"
            onChange={(e) =>
              setSettings({ ...settings, bankName: e.target.value })
            }
            value={settings.bankName}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Account Number:</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter account number"
            onChange={(e) =>
              setSettings({ ...settings, bankAccountNumber: e.target.value })
            }
            value={settings.bankAccountNumber}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Set Currency</label>
          {/* <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter currency"
            onChange={(e) =>
              setSettings({ ...settings, currency: e.target.value })
            }
            value={settings.currency}
          /> */}

          <select
            name="currency"
            id="currency"
            onChange={(e) =>
              setSettings({ ...settings, currency: e.target.value })
            }
            value={settings.currency}
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Set Discount</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter discount"
            onChange={(e) =>
              setSettings({ ...settings, discountRate: e.target.value })
            }
            value={settings.discountRate}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Set Tax</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter tax"
            onChange={(e) =>
              setSettings({ ...settings, taxRate: e.target.value })
            }
            value={settings.taxRate}
          />
        </div>
      </div>
    </div>
  );
}
export function Email({ settings, setSettings }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mt-4">
          <label className="block mb-2">SMTP Server:</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter SMTP server"
            onChange={(e) =>
              setSettings({ ...settings, emailHost: e.target.value })
            }
            value={settings.emailHost}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">SMTP Port:</label>
          <input
            type="number"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter SMTP port"
            onChange={(e) =>
              setSettings({ ...settings, emailPort: e.target.value })
            }
            value={settings.emailPort}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Email Username:</label>
          <input
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter email username"
            onChange={(e) =>
              setSettings({ ...settings, emailUsername: e.target.value })
            }
            value={settings.emailUsername}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Email Password:</label>
          <input
            type="password"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 w-full rounded shadow"
            placeholder="Enter email password"
            onChange={(e) =>
              setSettings({ ...settings, emailPassword: e.target.value })
            }
            value={settings.emailPassword}
          />
        </div>
      </div>
    </div>
  );
}
