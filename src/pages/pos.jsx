import axios from "axios";
import Navbar from "../components/navbar";
import Input from "../components/sales/input";
import Categories from "../components/sales/categories";
import CatProduct from "../components/sales/catProduct";
import Sidebar from "../components/sidebar";
import { useFormatMoney } from "../services/helper";
import PrintReciept from "../components/sales/salesReciept";
import { success, failed } from "../services/helper";
import { useEffect, useState, useRef, useContext } from "react";
import Select from "react-select";

// import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";
import { SettingContext } from "../context/settingContext";
import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

function Pos() {
  const { settings, loading } = useContext(SettingContext);

  const formatMoney = useFormatMoney();

  const [value, setValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [customer, setCustomer] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [catproduct, setCatProduct] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [paymethod, setPaymethod] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [saleData, setSaleData] = useState({});
  const [receiptData, setReceiptData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  // const navigate = useNavigate();
  const { cartItem } = useContext(CartContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  if (!Array.isArray(products)) return null;

  useEffect(() => {
    if (loading) return;
    document.title = `POS - ${settings.siteName}`;

    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers/customers`, {
          withCredentials: true,
        });
        setCustomerList(response.data.customers);
        console.log("Customers fetched:", response.data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [loading]);
  const customerOptions = customerList.map((cust) => ({
    value: cust.id,
    label: `${cust.name} - ${cust.phone}`,
  }));

  const handleChange = async (e) => {
    const barCode = e.target.value;
    setValue(barCode);
    if (!barCode) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/product/viewByBarcode/${barCode}`,
        {
          withCredentials: true,
        },
      );
      // Assuming response.data has a product property
      const product = response.data.product || response.data;

      setProductData(product ? [product] : []);
      setCatProduct([]);

      console.log("customer entered:", customer);
      console.log(value);

      console.log("Barcode search result:", response.data);
      console.log("Product set:", product);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNameChange = async (e) => {
    setIsLoading(true);
    const name = e.target.value;
    setNameValue(name);
    if (!name) return;

    try {
      const response = await axios.get(
        `${API_URL}/product/viewByNameLike/${name}`,
        {
          withCredentials: true,
        },
      );
      // Backend returns array of products for name search
      const products = response.data.product || response.data;
      setProductData(products);
      console.log("Name search result:", response.data);
      console.log("Products set:", products);
      setCatProduct([]);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToCart = (productToAdd) => {
    if (!productToAdd) return;

    const existingProduct = products.find(
      (item) => item.id === productToAdd.id,
    );

    if (existingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === productToAdd.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...productToAdd,
          cartId: Date.now() + Math.random(),
          quantity: 1,
        },
      ]);
    }
  };

  const handleAddToCart = (productToAdd) => {
    if (!productToAdd) return;
    addProductToCart(productToAdd);
    setValue("");
    setNameValue("");
    setCatProduct([]);
  };
  // useEffect(() => {
  //   console.log("Current products in cart:", products);
  // }, [products]);

  const handleRemoveCart = (productId) => {
    const existingProduct = products.find((item) => item.id === productId);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        // Decrease quantity if more than 1
        setProducts(
          products.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        );
      } else {
        // Remove item from cart if quantity is 1
        setProducts(products.filter((item) => item.id !== productId));
      }
    }
  };
  const handleChangeQty = (productId, newQty) => {
    // Allow empty string to clear the field, then parse
    if (newQty === "") {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: 0 } : item,
        ),
      );
      return;
    }

    const quantity = Number(newQty);
    if (isNaN(quantity) || quantity < 0) return; // Ignore invalid quantities

    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item,
      ),
    );
  };
  const getProductsByCategory = (categoryId) => {
    // Fetch products by category ID and update catproduct state
    // You can implement the API call here or pass this function down to the Categories component

    const fetchCatProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/product/viewBy-category/${categoryId}`,
          {
            withCredentials: true,
          },
        );
        setCatProduct(
          response.data.products.map((p) => ({
            ...p,
            price: Number(p.price),
          })),
        );

        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCatProducts();
    console.log(catproduct);
  };
  const subTotal = products.reduce(
    (total, product) =>
      total + Number(product.price) * Number(product.quantity),
    0,
  );
  const totalPurchase =
    subTotal - subTotal * (discount / 100) + subTotal * (taxRate / 100);
  let balanceRemaining;
  if (amountPaid === 0 || amountPaid === "") {
    balanceRemaining = 0;
  } else {
    balanceRemaining =
      subTotal -
      subTotal * (discount / 100) +
      subTotal * (taxRate / 100) -
      amountPaid;
  }
  const handlePrint = async () => {
    let paymentStatus;
    if (balanceRemaining > 0) {
      paymentStatus = "debt";
    }
    if (balanceRemaining === 0) {
      paymentStatus = "completed";
    }
    if (balanceRemaining < 0) {
      paymentStatus = "balance";
    }
    // Implement save functionality here
    const saleData = {
      paymentMethod: paymethod,
      customerId: customer,
      totalAmount: totalPurchase,
      items: products,
      discount: subTotal * (discount / 100),
      taxRate: subTotal * (taxRate / 100),
      amountPaid: amountPaid,
      amountRemaining: balanceRemaining,
      paymentStatus: paymentStatus,
    };
    setSaleData(saleData);
    cartItem(saleData);
    if (products.length === 0) {
      failed("Error", "No products in the cart to save the sale");
      return;
    }

    if (amountPaid === 0) {
      failed("Error", "Kindly enter amount paid to proceed");
      return;
    }
    if (paymethod === "") {
      failed("Error", "Kindly select a payment method to proceed");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/sales/create-sale`,
        saleData,
        {
          withCredentials: true,
        },
      );
      console.log("Sale saved successfully:", response.data);
      const invoiceNumber = response.data.SaleInvoice;
      const customer = response.data.customerName;

      // Store receipt data BEFORE clearing cart
      const subTotal = products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      const total =
        subTotal - subTotal * (discount / 100) + subTotal * (taxRate / 100);
      setReceiptData({
        items: products,
        customer: customer,
        discount: subTotal * (discount / 100),
        taxRate: subTotal * (taxRate / 100),
        amountPaid,
        total,
        paymethod,
        invoice: invoiceNumber,
      });

      setShowReceipt(true);
      // Clear cart and reset fields after successful save
      setProducts([]);
      setDiscount(0);
      setAmountPaid(0);
      setPaymethod("");
    } catch (error) {
      console.error("Error saving sale:", error);
      failed("Error", "Failed to save sale");
    }

    console.log("Saving sale data:", saleData);
    // You can send saleData to the backend API here
  };

  const handleSave = async () => {
    let paymentStatus;
    if (balanceRemaining > 0) {
      paymentStatus = "debt";
    }
    if (balanceRemaining === 0) {
      paymentStatus = "completed";
    }
    if (balanceRemaining < 0) {
      paymentStatus = "balance";
    }
    // Implement save functionality here
    const saleData = {
      paymentMethod: paymethod,
      customerId: customer,
      totalAmount: totalPurchase,
      items: products,
      discount: subTotal * (discount / 100),
      taxRate: subTotal * (taxRate / 100),
      amountPaid: amountPaid,
      amountRemaining: balanceRemaining,
      paymentStatus: paymentStatus,
    };
    setSaleData(saleData);
    cartItem(saleData);
    if (products.length === 0) {
      failed("Error", "No products in the cart to save the sale");
      return;
    }

    if (amountPaid === 0) {
      failed("Error", "Kindly enter amount paid to proceed");
      return;
    }
    if (paymethod === "") {
      failed("Error", "Kindly select a payment method to proceed");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/sales/create-sale`,
        saleData,
        {
          withCredentials: true,
        },
      );
      console.log("Sale saved successfully:", response.data);

      success("Success", "Sale saved successfully");

      // Clear cart and reset fields after successful save
      setProducts([]);
      setDiscount(0);
      setTaxRate(0);
      setAmountPaid(0);
      setPaymethod("");
    } catch (error) {
      console.error("Error saving sale:", error);
      failed("Error", "Failed to save sale");
    }

    console.log("Saving sale data:", saleData);
    // You can send saleData to the backend API here
  };

  return (
    <div className="min-h-screen">
      {isLoading && <p>Loading...</p>}
      {loading ? (
        <div>Loading settings...</div>
      ) : (
        <div className="flex justify-start">
          <Sidebar open={openSidebar} />
          <div
            className=" w-full p-4 bg-gray-300"
            onClick={() => setOpenSidebar(false)}
          >
            <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

            <div className="flex flex-col md:flex-row gap-2 items-center bg-gray-50 p-4 mt-4 rounded-2xl">
              <Input
                value={value}
                handleChange={handleChange}
                placeholder="enter product barcode here"
                className="md:w-1/3 w-full"
              />
              <Input
                value={nameValue}
                handleChange={handleNameChange}
                placeholder="enter product name"
                className="md:w-1/3 w-full"
              />
              <Select
                options={customerOptions}
                onChange={(selectedOption) =>
                  setCustomer(selectedOption ? selectedOption.value : "")
                }
                placeholder="Select a customer"
                className="md:w-1/3 w-1/2"
              />
            </div>

            <hr className="text-gray-300 " />
            <div className=" flex lg:flex-row flex-col gap-2 text-sm">
              <div className="w-full lg:w-3/4">
                <div className=" mt-4 px-4 shadow-2xl bg-gray-50 h-100 rounded-2xl overflow-y-auto">
                  <h3 className="m-4 font-bold">Search By Categories</h3>
                  <div className=" gap-4 w-1/2 md:w-1/3 mt-4">
                    <Categories
                      category={category}
                      setCategory={setCategory}
                      getProductsByCategory={getProductsByCategory}
                    />
                  </div>
                  <hr className="text-gray-300 m-5" />
                  <h3 className="m-4 font-bold">Products</h3>
                  <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {productData &&
                      productData.map((prod) => (
                        <div
                          key={prod.id}
                          className=" w-full group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between"
                        >
                          {/* Product Name */}
                          <h4 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
                            {prod.name}
                          </h4>

                          {/* Optional Description */}
                          {prod.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {prod.description}
                            </p>
                          )}

                          {/* Price */}
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">
                              ${Number(prod.price).toFixed(2)}
                            </span>
                            <span
                              className={
                                prod.stock >= prod.lowAlert
                                  ? "text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium"
                                  : "text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium"
                              }
                            >
                              {prod.stock}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl p-2">
                            <button
                              onClick={() => handleRemoveCart(prod.id)}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 active:scale-95 transition"
                            >
                              <MinusIcon className="h-2 w-2 md:h-4 md:w-4" />
                            </button>

                            <input
                              type="number"
                              min={0}
                              value={
                                products.find((p) => p.id === prod.id)
                                  ?.quantity || 0
                              }
                              onChange={(e) =>
                                handleChangeQty(prod.id, e.target.value)
                              }
                              className="w-16 text-center bg-white border border-gray-300 rounded-lg font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <button
                              onClick={() => handleAddToCart(prod)}
                              className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 active:scale-95 transition"
                            >
                              <PlusIcon className="h-2 w-2 md:h-4 md:w-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                    {catproduct && (
                      <CatProduct
                        catproduct={catproduct}
                        products={products}
                        onAdd={addProductToCart}
                        onRemove={handleRemoveCart}
                        onChangeQty={handleChangeQty}
                      />
                    )}
                  </div>
                </div>
                <div className=" mt-4 px-4 shadow-2xl bg-gray-50 h-60 rounded-2xl overflow-y-auto">
                  <h3>Recent Sales</h3>
                  <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/80 backdrop-blur-md border border-gray-200">
                    <table className="min-w-full text-sm">
                      <thead className="sticky top-0 bg-linear-to-r from-amber-500 to-orange-500 text-white">
                        <tr>
                          <th className="px-6 py-2 text-left font-semibold tracking-wide">
                            Product
                          </th>
                          <th className="px-6 py-2 text-center font-semibold tracking-wide">
                            Qty
                          </th>
                          <th className="px-6 py-2 text-right font-semibold tracking-wide">
                            Unit Price
                          </th>
                          <th className="px-6 py-2 text-right font-semibold tracking-wide">
                            Total
                          </th>
                          <th className="px-6 py-2 text-right font-semibold tracking-wide">
                            Action
                          </th>
                          <th className="px-6 py-2 text-right font-semibold tracking-wide"></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr
                            key={product.cartId}
                            className="hover:bg-gray-50 transition-all duration-200 odd:bg-white even:bg-gray-50"
                          >
                            <td className="px-6 py-1 font-medium text-gray-800">
                              {product.name}
                            </td>

                            <td className="px-6 py-1 text-center">
                              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">
                                {product.quantity}
                              </span>
                            </td>

                            <td className="px-6 py-1 text-right font-medium text-gray-800">
                              ${Number(product.price || 0).toFixed(2)}
                            </td>

                            <td className="px-6 py-1 text-right font-bold text-gray-900">
                              ${(product.price * product.quantity).toFixed(2)}
                            </td>

                            <td className="px-6 py-1 text-right">
                              <button
                                onClick={() =>
                                  handleChangeQty(
                                    product.id,
                                    product.quantity + 1,
                                  )
                                }
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                <ShoppingCartIcon className="h-6 w-6" />
                              </button>
                            </td>

                            <td className="px-6 py-1 text-right">
                              <button
                                onClick={() => handleRemoveCart(product.id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                <TrashIcon className="h-6 w-6" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className=" mt-4 px-4 bg-gray-50 h-165 w-full lg:w-1/4 rounded-2xl overflow-y-auto">
                <h3 className="text-center font-bold mb-10">Cart Items</h3>
                <div className="flex justify-between px-4">
                  <h4>Ordered Items</h4>
                  <span>{products.length}</span>
                </div>
                <hr />
                <div>
                  {products.map((product) => (
                    <div
                      key={product.cartId}
                      className="flex justify-between px-4 my-2"
                    >
                      <p>
                        <span>{product.quantity}x</span> {product.name}
                      </p>
                      <span>
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 relative top-40 w-full">
                  <div className="flex justify-between px-4 font-bold my-4">
                    <h4>Payment Summary</h4>
                  </div>
                  <hr />

                  <div>
                    <div className="flex justify-between px-4 my-2 font-semibold">
                      <p>Subtotal</p>
                      <span>{formatMoney(subTotal)}</span>
                    </div>

                    <div className="flex justify-between px-4 my-2 font-semibold">
                      <label htmlFor="">Discount(%)</label>

                      <p className="w-1/3">
                        {settings.discountRate > 0
                          ? settings.discountRate
                          : "No Discount"}
                      </p>
                      <span>{formatMoney(subTotal * (discount / 100))}</span>
                    </div>

                    <div className="flex justify-between px-4 my-2 font-semibold">
                      <label htmlFor="">Tax/Vat(%)</label>

                      <p className="w-1/3">
                        {settings.taxRate > 0 ? settings.taxRate : "No Tax"}
                      </p>
                      <span>{formatMoney(subTotal * (taxRate / 100))}</span>
                    </div>

                    <div className="flex justify-between px-4 my-2 font-semibold">
                      <label>Amount paid</label>
                      <input
                        className="border border-gray-300 w-1/3"
                        type="number"
                        value={amountPaid}
                        onChange={(e) => {
                          setAmountPaid(e.target.value);
                          setDiscount(
                            settings.discountRate ? settings.discountRate : 0,
                          );
                          setTaxRate(settings.taxRate ? settings.taxRate : 0);
                        }}
                      />
                    </div>

                    <div className="flex justify-between px-4 my-2 font-semibold">
                      <p>Balance</p>
                      <span>{formatMoney(balanceRemaining)}</span>
                    </div>

                    <div className="flex justify-between px-4 my-2 font-bold text-lg">
                      <p>Total Purchase</p>
                      <span>{formatMoney(totalPurchase)}</span>
                    </div>
                  </div>

                  <div>
                    <div>
                      <h4>Payment Method</h4>
                    </div>
                    <hr />
                    <div className="flex justify-between px-4 my-4">
                      <label
                        className={`bg-amber-100  px-2 py-1 rounded border ${
                          paymethod === "cash"
                            ? " text-green-700 border-green-300"
                            : "text-amber-700 border-amber-300"
                        }`}
                        htmlFor="cash"
                      >
                        <input
                          type="radio"
                          value="cash"
                          checked={paymethod === "cash"}
                          onChange={(e) => {
                            setPaymethod(e.target.value);
                            setShowBank(false);
                          }}
                        />{" "}
                        Cash
                      </label>
                      <label
                        className={
                          paymethod === "card"
                            ? "bg-amber-100 text-green-700 px-2 py-1 rounded border border-green-300"
                            : "bg-amber-100 text-amber-700 px-2 py-1 rounded border border-amber-300"
                        }
                        htmlFor="card"
                      >
                        <input
                          type="radio"
                          value="card"
                          checked={paymethod === "card"}
                          onChange={(e) => {
                            setPaymethod(e.target.value);
                            setShowBank(false);
                          }}
                        />{" "}
                        Card
                      </label>
                      <label
                        className={
                          paymethod === "transfer"
                            ? "bg-amber-100 text-green-700 px-2 py-1 rounded border border-green-300"
                            : "bg-amber-100 text-amber-700 px-2 py-1 rounded border border-amber-300"
                        }
                        htmlFor="transfer"
                      >
                        <input
                          type="radio"
                          value="transfer"
                          checked={paymethod === "transfer"}
                          onChange={(e) => {
                            setPaymethod(e.target.value);
                            setShowBank(true);
                          }}
                        />{" "}
                        transfer
                      </label>
                    </div>
                    {showBank && (
                      <div>
                        <div className="flex justify-between px-4 my-2 font-semibold">
                          <p>Bank Name</p>
                          <p>{settings.bankName}</p>
                        </div>
                        <div className="flex justify-between px-4 my-2 font-semibold">
                          <p>Bank Name</p>
                          <p>{settings.bankAccountName}</p>
                        </div>
                        <div className="flex justify-between px-4 my-2 font-semibold">
                          <p>Account Number</p>
                          <p>{settings.bankAccountNumber}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" flex justify-around px-4">
                    <button
                      onClick={handlePrint}
                      className="bg-green-500 text-white w-25 p-2 rounded mb-4"
                    >
                      Save and Print
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white w-25 p-2 rounded mb-4"
                    >
                      just Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showReceipt && (
            <PrintReciept
              cartItems={receiptData?.items || []}
              customer={receiptData?.customer}
              discount={receiptData?.discount}
              taxRate={receiptData?.taxRate}
              amountPaid={receiptData?.amountPaid}
              totalPurchase={receiptData?.total}
              paymethod={receiptData?.paymethod}
              invoice={receiptData?.invoice}
              setShowReceipt={setShowReceipt}
            />
          )}
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default Pos;
