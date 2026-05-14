type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const income = Number(slug.split("-")[0]);

  if (isNaN(income)) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          Invalid Salary Page
        </h1>
      </main>
    );
  }

  const tax = calculateTax(income);
  const medicare = income * 0.02;
  const takeHome = income - tax - medicare;

  const monthly = takeHome / 12;
  const weekly = takeHome / 52;

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-5xl font-black mb-4">
          ${income.toLocaleString()} After Tax Australia
        </h1>

        <p className="text-slate-600 text-lg mb-10">
          If you earn ${income.toLocaleString()} per year in Australia,
          your estimated take-home pay after tax is approximately $
          {takeHome.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <Card
            title="Gross Income"
            value={`$${income.toLocaleString()}`}
          />

          <Card
            title="Income Tax"
            value={`$${tax.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`}
          />

          <Card
            title="Medicare Levy"
            value={`$${medicare.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`}
          />

          <Card
            title="Take Home Pay"
            value={`$${takeHome.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`}
          />

          <Card
            title="Monthly Take Home"
            value={`$${monthly.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`}
          />

          <Card
            title="Weekly Take Home"
            value={`$${weekly.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`}
          />

        </div>

        <div className="mt-12 space-y-6 text-slate-700 leading-8">

          <h2 className="text-3xl font-bold">
            Salary Breakdown
          </h2>

          <p>
            An annual salary of ${income.toLocaleString()} in Australia
            is a common salary level for professionals, tradespeople,
            and skilled workers.
          </p>

          <p>
            Your estimated income tax is around $
            {tax.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}.
          </p>

          <p>
            Your estimated weekly take-home pay is around $
            {weekly.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}.
          </p>

        </div>

      </div>
    </main>
  );
}

function calculateTax(income: number) {
  if (income <= 18200) return 0;

  if (income <= 45000) {
    return (income - 18200) * 0.16;
  }

  if (income <= 135000) {
    return 4288 + (income - 45000) * 0.3;
  }

  if (income <= 190000) {
    return 31288 + (income - 135000) * 0.37;
  }

  return 51638 + (income - 190000) * 0.45;
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-6">

      <p className="text-slate-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

    </div>
  );
}