type CardProps = {
  title: string
}

const CardCustom: React.FC<CardProps> = ({ title }) => (
  <div className="m-4 h-96 w-1/2 overflow-hidden rounded-lg bg-zinc-600 shadow-md transition duration-300 hover:shadow-lg">
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold text-zinc-50">{title}</h2>
    </div>
  </div>
)

export default CardCustom
