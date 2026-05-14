type Props = {
  params: {
    income: string
  }
}

export async function generateMetadata({ params }: Props) {
  const income = params.income

  return {
    title: `${income} After Tax Australia 2026 | Aussie Tax Mate`,
    description: `Calculate ${income} after tax salary in Australia including Medicare Levy, HECS and Super.`,
  }
}

export default function SalaryPage({ params }: Props) {
  const income = Number(params.income.replace('k', '000'))

  const tax = calculateTax(income)
  const medicare = income * 0.02
  const net = income - tax - medicare

  const money = (n: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="text-5xl font-black mb-6">
            {params.income} After Tax Australia
          </h1>

          <p className="text-slate-600 text-lg mb-10">
            Calculate how much you take home earning {params.income} per year in Australia.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Gross Income" value={money(income)} />
            <Card title="Income Tax" value={money(tax)} />
            <Card title="Medicare Levy" value={money(medicare)} />
            <Card title="Take Home Pay" value={money(net)} />
          </div>

          <div className="mt-12 prose max-w-none">
            <h2>How much is {params.income} after tax in Australia?</h2>

            <p>
              If you earn {money(income)} per year in Australia, your estimated take-home pay is {money(net)} after income tax and Medicare Levy.
            </p>

            <p>
              This estimate is based on 2025-2026 Australian resident tax rates and does not include deductions or offsets.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

function calculateTax(income: number) {
  if (income <= 18200) return 0
  if (income <= 45000) return (income - 18200) * 0.16
  if (income <= 135000) return 4288 + (income - 45000) * 0.3
  if (income <= 190000) return 31288 + (income - 135000) * 0.37
  return 51638 + (income - 190000) * 0.45
}

function Card({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-2xl border p-6">
      <p className="text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  )
}
