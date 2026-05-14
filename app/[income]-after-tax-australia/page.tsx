type Props = {
  params: {
    income: string;
  };
};

function calculateTax(income: number) {
  let tax = 0;

  if (income <= 18200) {
    tax = 0;
  } else if (income <= 45000) {
    tax = (income - 18200) * 0.16;
  } else if (income <= 135000) {
    tax = 4288 + (income - 45000) * 0.30;
  } else if (income <= 190000) {
    tax = 31288 + (income - 135000) * 0.37;
  } else {
    tax = 51638 + (income - 190000) * 0.45;
  }

  return tax;
}

export default function SalaryPage({ params }: Props) {
  const income = Number(params.income);

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
          your estimated take-home pay after tax is approximately
          ${takeHome.toLocaleString(undefined, {
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
            falls into a common income range for skilled workers,
            professionals, tradespeople, and office employees.
          </p>

          <p>
            Your estimated income tax is around
            {" "}
            ${tax.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
            , plus Medicare Levy.
          </p>

          <p>
            Your estimated weekly take-home pay is around
            {" "}
            ${weekly.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
            .
          </p>

          <p>
            This calculator is intended for Australian residents and
            provides a general estimate only.
          </p>
        </div>
      </div>
    </main>
  );
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
      <p className="text-slate-500">{title}</p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}