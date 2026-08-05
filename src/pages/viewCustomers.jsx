import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { useReactToPrint } from "react-to-print";

export default function ViewCustomers() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const [customers, setCustomers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailId, setEmailId] = useState("");
  const [ids, setIds] = useState([]);
  const [openmailModal, setOpenMailModal] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  useEffect(() => {
    // Fetch users or any other data here
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers/customers`, {
          withCredentials: true,
        });
        console.log("Customers fetched:", response.data.customers);
        setCustomers(response.data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("Failed to fetch customers");
        }
      }
    };
    fetchCustomers();
  }, []);
  const handleMailer = async () => {
    // Implement email sending logic here using the subject, message, and emailId state variables
    console.log("Email sent to:", arrayMail);
    console.log("Subject:", subject);
    console.log("Message:", message);
    const customerName = customers.find(
      (customer) => customer.email === emailId,
    );
    try {
      const formData = {
        subject,
        message,
        email: arrayMail,
        name: customerName ? customerName.name : "",
      };
      const response = await axios.post(
        `${API_URL}/customers/send-email`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
    setOpenMailModal(false);
  };

  // const handleBulkEmail = () => {
  //   // Implement bulk email sending logic here using the subject, message, and ids state variables
  //   console.log("Bulk Email sent to:", ids);
  //   console.log("Subject:", subject);
  //   console.log("Message:", message);
  //   setOpenMailModal(false);
  // };

  // Handle checkbox selection for customers
  const handleIds = (email) => {
    if (ids.includes(email)) {
      setIds(ids.filter((item) => item !== email));
    } else {
      setIds([...ids, email]);
    }
  };

  // Implement filtering logic based on searchTerm and any other criteria
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const mails = emailId === "" ? ids.join(", ") : emailId;
  const arrayMail = emailId === "" ? ids : emailId;
  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Customers List</h2>
          <div className="flex bg-white p-4 rounded-lg justify-around mb-4 shadow-2xl gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <div className="w-full flex p-2 border border-gray-300 rounded-lg gap-4">
              <select name="" id="">
                <option value="">Filter by category</option>
              </select>
              <button className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white rounded">
                Filter
              </button>
            </div>
          </div>
          {customers && customers.length > 0 ? (
            <div ref={printRef} className="bg-white rounded-2xl p-4 shadow ">
              <div className="flex justify-between mb-4">
                <p>Showing {customers.length} customers</p>
                {/* <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p> */}
                <p>
                  printed on {new Date().toLocaleDateString()} at{" "}
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200">
                  <thead className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Role
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Permission
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-3 px-6">
                          {" "}
                          {
                            <input
                              type="checkbox"
                              onChange={() => {
                                setEmailId("");
                                handleIds(customer.email);
                              }}
                              className="form-checkbox h-4 w-4 text-blue-600"
                            />
                          }
                        </td>
                        <td className="py-3 px-6">{customer?.name}</td>
                        <td className="py-3 px-6">{customer?.email}</td>
                        <td className="py-3 px-6">{customer?.phone}</td>
                        <td className="py-3 px-6">{customer?.address}</td>
                        <td className="py-3 px-6">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                              setOpenMailModal(true);
                              setEmailId(customer.email);
                            }}
                          >
                            send email
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handlePrint}
                className="bg-blue-900 px-4 py-2 rounded text-white mt-4 mx-2"
              >
                Print Customers
              </button>
              <button
                onClick={() => {
                  // handleBulkEmail();
                  setOpenMailModal(true);
                }}
                className="bg-indigo-500 px-4 py-2 rounded text-white mt-4 mx-2"
              >
                Send Email to Selected
              </button>
            </div>
          ) : (
            "No customers found"
          )}
        </div>
      </div>
      {openmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Send Email</h2>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <input
              type="email"
              placeholder="Recipient Email"
              value={mails}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setOpenMailModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleMailer}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
