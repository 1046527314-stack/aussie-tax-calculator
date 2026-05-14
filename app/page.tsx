'use client'

import { useState } from 'react'

export default function Page() {
  const [salary, setSalary] = useState(80000)
  const [hecs, setHecs] = useState(false)
  const [superIncluded, setSuperIncluded] = useState(false)

  const superRate = 0.115

  const taxableIncome = superIncluded ? salary / (1 + superRate) : salary

  function incomeTax(income: number) {
    if (income <= 18200) return 0
    if (income <= 45000) return (income - 18200) * 0.16
    if (income <= 135000) return 4288 + (income - 45000) * 0.3
    if (income <= 190000) return 31288 + (income - 135000) * 0.37
    return 51638 + (income - 190000) * 0.45
  }

  function hecsTax(income: number) {
    if (!hecs) return 0
    if (income < 54435) return 0
    return income * 0.04
  }

  const tax = incomeTax(taxableIncome)
  const medicare = taxableIncome * 0.02
  const hecsAmount = hecsTax(taxableIncome)
  const superAmount = taxableIncome * superRate
  const net = taxableIncome - tax - medicare - hecsAmount

  const money = (n: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <div className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white mb-4">
            🇦🇺 Australia Tax Calculator
          </div>

          <h1 className="text-5xl font-black text-slate-900 mb-4">
            澳洲税后工资计算器
          </h1>

          <p className="text-lg text-slate-600">
            快速计算澳洲税后收入、HECS、Super 和 Medicare Levy
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">输入信息</h2>

            <div className="mb-6">
              <label className="block mb-3 font-semibold text-slate-700">
                Annual Salary
              </label>

              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-300 p-5 text-2xl font-bold outline-none focus:border-blue-500"
              />
            </div>

            <label className="flex items-center justify-between rounded-2xl border p-5 mb-4">
              <div>
                <p className="font-bold">HECS / HELP Debt</p>
                <p className="text-sm text-slate-500">
                  Include student loan repayment
                </p>
              </div>

              <input
                type="checkbox"
                checked={hecs}
                onChange={() => setHecs(!hecs)}
                className="w-6 h-6"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border p-5">
              <div>
                <p className="font-bold">Salary Includes Super</p>
                <p className="text-sm text-slate-500">
                  Package including superannuation
                </p>
              </div>

              <input
                type="checkbox"
                checked={superIncluded}
                onChange={() => setSuperIncluded(!superIncluded)}
                className="w-6 h-6"
              />
            </label>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">计算结果</h2>

            <div className="rounded-3xl bg-blue-600 p-8 text-white mb-8">
              <p className="text-sm opacity-80">Taxable Take Home</p>

              <h3 className="text-5xl font-black mt-2">
                {money(net)}
              </h3>

              <p className="mt-3 opacity-80">
                Estimated annual after-tax income
              </p>
            </div>

            <Result title="Monthly Income" value={money(net / 12)} />
            <Result title="Weekly Income" value={money(net / 52)} />
            <Result title="Income Tax" value={money(tax)} />
            <Result title="Medicare Levy" value={money(medicare)} />
            <Result title="HECS / HELP" value={money(hecsAmount)} />
            <Result title="Superannuation" value={money(superAmount)} />

            <div className="mt-8 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
              This calculator is an estimate only and not official tax advice.
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function Result({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <span className="text-slate-600">{title}</span>
      <strong className="text-lg">{value}</strong>
    </div>
  )
}