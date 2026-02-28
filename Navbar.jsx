import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">MyStore</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/transaction">Transaction</Link>
      </div>
    </nav>
  )
}