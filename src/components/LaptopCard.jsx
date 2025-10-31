import "../App.css";

export default function LaptopCard({ laptop, onRent }) {
  const {
    id,
    brand,
    model,
    description,
    graphicsCard,
    processor,
    ram,
    storage,
    rentPerDay,
    available,
    blocked,
    conditionStatus,
  } = laptop;

  const isAvailable = available?.data ? available.data[0] === 1 : !!available;
  const isBlocked = blocked?.data ? blocked.data[0] === 1 : !!blocked;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg pt-3 transition ${
        !isAvailable || isBlocked ? "opacity-60" : ""
      }`}
    >
      <img
        src="https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg"
        alt={`${brand} ${model}`}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{brand} {model}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>

        <ul className="text-sm text-gray-700 space-y-1 mb-4">
          <li><b>Processor:</b> {processor}</li>
          <li><b>Graphics:</b> {graphicsCard}</li>
          <li><b>RAM:</b> {ram}</li>
          <li><b>Storage:</b> {storage}</li>
          <li><b>Condition:</b> {conditionStatus}</li>
        </ul>

        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">₹{rentPerDay}/day</span>
          <button
            className={`btn px-3 py-1 rounded ${!isAvailable || isBlocked ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={!isAvailable || isBlocked}
            onClick={() => {
              if (!user) alert("⚠️ Please login first to rent.");
              else onRent(id);
            }}
          >
            {isBlocked ? "Blocked" : !isAvailable ? "Unavailable" : "Rent Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
