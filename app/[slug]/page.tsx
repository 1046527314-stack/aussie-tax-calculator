type Props = {
  params: {
    slug: string
  }
}

export default function SalaryPage({ params }: Props) {
  const salary = extractSalary(params.slug)

  if (!salary) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          Invalid Salary Page
        </h1>
      </main>
    )
  }

  const tax = calculateTax(salary)
  const medicare = salary * 0.02
  const takeHome = salary - tax - medicare
  const monthly = takeHome / 12
  const weekly = takeHome / 52

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-5xl font-black mb-6">
          ${salary.toLocaleString()} After Tax Australia
        </h1>

        <p className="text-xl text-slate-600 mb-10">
          Calculate how much take-home pay you keep in Australia
          after income tax and Medicare levy.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <Card
            title="Gross Income"
            value={`$${salary.toLocaleString()}`}
          />

          <Card
            title="Income Tax"
            value={`$${Math.round(tax).toLocaleString()}`}
          />

          <Card
            title="Medicare Levy"
            value={`$${Math.round(medicare).toLocaleString()}`}
          />

          <Card
            title="Take Home Pay"
            value={`$${Math.round(takeHome).toLocaleString()}`}
          />

          <Card
            title="Monthly Pay"
            value={`$${Math.round(monthly).toLocaleString()}`}
          />

          <Card
            title="Weekly Pay"
            value={`$${Math.round(weekly).toLocaleString()}`}
          />

        </div>

        <section className="mt-12 space-y-6 text-slate-700">

          <h2 className="text-3xl font-bold">
            Australia Salary Breakdown
          </h2>

          <p>
            If you earn ${salary.toLocaleString()} per year in Australia,
            your estimated after-tax income is approximately
            ${Math.round(takeHome).toLocaleString()} annually.
          </p>

          <p>
            This includes Australian income tax rates and
            Medicare levy calculations.
          </p>

          <p>
            Your estimated monthly take-home pay is
            ${Math.round(monthly).toLocaleString()}.
          </p>

        </section>

        <footer className="mt-16 text-center text-sm text-slate-500 space-x-4">

          <a href="/about">About</a>

          <a href="/contact">Contact</a>

          <a href="/privacy-policy">Privacy Policy</a>

        </footer>

      </div>
    </main>
  )
}

function extractSalary(slug: string) {
  const match = slug.match(/^(\d+)-after-tax-australia$/)

  if (!match) return null

  return Number(match[1])
}

function calculateTax(income: number) {
  if (income <= 18200) return 0

  if (income <= 45000) {
    return (income - 18200) * 0.16
  }

  if (income <= 135000) {
    return 4288 + (income - 45000) * 0.3
  }

  if (income <= 190000) {
    return 31288 + (income - 135000) * 0.37
  }

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
    <div className="rounded-2xl border p-6 bg-slate-50">
      <p className="text-slate-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  )
}