type Props = {
  params: {
    slug: string;
  };
};

function calculateTax(slug: number) {
  let tax = 0;

  if (slug <= 18200) {
    tax = 0;
  } else if (slug <= 45000) {
    tax = (slug - 18200) * 0.16;
  } else if (slug <= 135000) {
    tax = 4288 + (slug - 45000) * 0.30;
  } else if (slug <= 190000) {
    tax = 31288 + (slug - 135000) * 0.37;
  } else {
    tax = 51638 + (slug - 190000) * 0.45;
  }

  return tax;
}

export default function SalaryPage({ params }: Props) {
  const slug = Number(params.slug);

  if (isNaN(slug)) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          Invalid Salary Page
        </h1>
      </main>
    );
  }

  const tax = calculateTax(slug);
  const medicare = slug * 0.02;
  const takeHome = slug - tax - medicare;

  const monthly = takeHome / 12;
  const weekly = takeHome / 52;

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-5xl font-black mb-4">
          ${slug.toLocaleString()} After Tax Australia
        </h1>

        <p className="text-slate-600 text-lg mb-10">
          If you earn ${slug.toLocaleString()} per year in Australia,
          your estimated take-home pay after tax is approximately
          ${takeHome.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title="Gross slug"
            value={`$${slug.toLocaleString()}`}
          />

          <Card
            title="slug Tax"
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
            An annual salary of ${slug.toLocaleString()} in Australia
            falls into a common slug range for skilled workers,
            professionals, tradespeople, and office employees.
          </p>

          <p>
            Your estimated slug tax is around
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