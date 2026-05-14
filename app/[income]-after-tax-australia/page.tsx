type Props = {
  params: Promise<{
    income: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { income } = await params

  return {
    title: `${income} After Tax Australia | Aussie Tax Mate`,
    description: `Calculate ${income} after tax salary in Australia.`,
  }
}

export default async function SalaryPage({ params }: Props) {
  const { income } = await params

  const annualIncome = parseInt(income)

  if (isNaN(annualIncome)) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-4xl font-bold">
          Invalid Salary Page
        </h1>
      </main>
    )
  }

  const tax = calculateTax(annualIncome)
  const medicare = annualIncome * 0.02
  const net = annualIncome - tax - medicare

  const monthly = net / 12
  const fortnightly = net / 26
  const weekly = net / 52

  const money = (n: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <div className="mb-10">
            <h1 className="text-5xl font-black mb-4">
              {income} After Tax Australia
            </h1>

            <p className="text-slate-600 text-lg">
              Calculate how much you take home earning {money(annualIncome)} per year in Australia.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card title="Gross Income" value={money(annualIncome)} />
            <Card title="Income Tax" value={money(tax)} />
            <Card title="Medicare Levy" value={money(medicare)} />
            <Card title="Take Home Pay" value={money(net)} />
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card title="Monthly Pay" value={money(monthly)} />
            <Card title="Fortnightly Pay" value={money(fortnightly)} />
            <Card title="Weekly Pay" value={money(weekly)} />
          </div>

          <div className="prose max-w-none">
            <h2>
              How much is {income} after tax in Australia?
            </h2>

            <p>
              If you earn {money(annualIncome)} per year in Australia,
              your estimated take-home pay is {money(net)}
              after income tax and Medicare Levy.
            </p>

            <p>
              Your estimated monthly salary after tax is {money(monthly)},
              fortnightly pay is {money(fortnightly)},
              and weekly take-home pay is {money(weekly)}.
            </p>

            <p>
              This estimate is based on Australian resident tax rates
              and does not include deductions, offsets, or HECS repayments.
            </p>

            <h2>
              Related Salary Pages
            </h2>

            <ul>
              <li>
                <a href="/80000-after-tax-australia">
                  80000 After Tax Australia
                </a>
              </li>

              <li>
                <a href="/100000-after-tax-australia">
                  100000 After Tax Australia
                </a>
              </li>

              <li>
                <a href="/120000-after-tax-australia">
                  120000 After Tax Australia
                </a>
              </li>
            </ul>
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
    <div className="rounded-2xl border p-6 bg-white">
      <p className="text-slate-500 mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>
    </div>
  )
}