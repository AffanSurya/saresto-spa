export default function Receipt() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="container mx-auto rounded-lg bg-white p-4 shadow-lg">
        <div className="content">
          <div className="main w-full">
            <div className="content-wrap text-center">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">Thanks for using our app</h2>
              </div>
              <div className="mb-4">
                <div className="invoice border-t border-gray-200">
                  <div className="p-4">
                    <p>Anna Smith</p>
                    <p>Invoice #12345</p>
                    <p>June 01 2015</p>
                  </div>
                  <div>
                    <table className="invoice-items w-full text-left">
                      <tbody>
                        <tr>
                          <td>Service 1</td>
                          <td className="text-right">$ 20.00</td>
                        </tr>
                        <tr>
                          <td>Service 2</td>
                          <td className="text-right">$ 10.00</td>
                        </tr>
                        <tr>
                          <td>Service 3</td>
                          <td className="text-right">$ 6.00</td>
                        </tr>
                        <tr className="total border-t border-gray-200 font-bold">
                          <td className="text-right" width="80%">
                            Total
                          </td>
                          <td className="text-right">$ 36.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <a href="#/" className="text-blue-500">
                  View in browser
                </a>
              </div>
              <div className="mb-4">
                <p>Company Inc. 123 Van Ness, San Francisco 94102</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer mt-4">
          <div className="content-block text-center">
            <p>
              Questions? Email{" "}
              <a href="mailto:" className="text-blue-500">
                support@company.inc
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
