function CardSelect({ isActive, label, onClick }) {
  return (
    <div
      className={`w-full ${
        isActive ? "shadow-sm" : "shadow-lg"
      }  hover:shadow-sm p-4 shadow-gray-500`}
      onClick={onClick}
    >
      <span className="text-2xl">{label}</span>
    </div>
  );
}

export default CardSelect;
