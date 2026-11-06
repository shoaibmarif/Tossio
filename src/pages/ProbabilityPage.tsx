import React from 'react';
import { InteractiveConvergenceLab } from '../components/probability/InteractiveConvergenceLab';
import { FairnessTester } from '../components/tools/FairnessTester';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';

export const ProbabilityPage: React.FC = () => {

  return (
    <>
      <SeoMeta canonicalPath="/coin-flip-probability" />

      <div className="space-y-12 max-w-4xl mx-auto">
        <PageHeader title="Coin flip probability" intro="The maths behind heads or tails: why it’s 50/50, why streaks happen more than you’d think, and how results even out over many flips." />

        {/* Interactive Convergence Lab */}
        <InteractiveConvergenceLab />

        <article className="prose-page">
          <h2>It really is 50/50</h2>
          <p>
            A coin has two sides, and on a fair coin neither is favoured, so each has a probability of 1 in 2:
            50% heads, 50% tails. That doesn’t mean you’ll get exactly half heads in every session. It means that
            the more you flip, the closer to half you’ll get.
          </p>

          <h2>The coin doesn’t remember</h2>
          <p>
            Every flip is independent. After five heads in a row it’s tempting to think tails is “due”, but the
            coin has no idea what happened before. The next flip is still exactly 50/50. Believing otherwise is
            called the <strong>gambler’s fallacy</strong>, and it’s one of the most common mistakes people make
            with chance.
          </p>

          <h2>Streaks are more common than you think</h2>
          <p>
            The odds of a particular run are easy to work out: halve the chance for every extra flip. Here’s how
            likely it is to get heads several times in a row, starting from your next flip:
          </p>
        </article>

        <div className="overflow-x-auto">
          <table className="w-full max-w-md text-left text-sm">
            <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="py-2 pr-4 font-medium">Heads in a row</th>
                <th className="py-2 pr-4 font-medium">Chance</th>
                <th className="py-2 font-medium">About 1 in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 tabular-nums dark:divide-zinc-800">
              {[2, 3, 4, 5, 6, 7, 8, 10].map((n) => (
                <tr key={n}>
                  <td className="py-2 pr-4">{n}</td>
                  <td className="py-2 pr-4">{(100 / 2 ** n).toFixed(n > 6 ? 2 : 1)}%</td>
                  <td className="py-2">{(2 ** n).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <article className="prose-page">
          <p>
            Five in a row is 1 in 32, which sounds rare until you remember how many flips you make. If you flip 100
            times, you’ll very likely see a streak of five or six somewhere along the way.
          </p>

          <h2>Why short runs look lopsided</h2>
          <p>
            With only 10 flips, getting 7 heads and 3 tails happens all the time. A handy rule of thumb: results almost always land within 1 divided by the square root of the number of flips of 50%. So for 100 flips, anywhere from about 40% to 60% heads is normal. For 10,000 flips, it narrows to about 49% to 51%.
          </p>

          <h2>The law of large numbers</h2>
          <p>
            That shrinking wobble has a name. The law of large numbers, first proved by Jacob Bernoulli in the
            1700s, says that as you flip more and more, the share of heads gets closer and closer to 50%. It’s the
            same reason casinos always win in the long run, even though individual gamblers win all the time. Try
            it with the demo above, or run a million flips in the <a href="/coin-flip-experiment">simulator</a>.
          </p>

          <h2>What about real coins?</h2>
          <p>
            Real coins are very slightly biased towards the side that started facing up. You can read about that,
            and about how an online flip gets its randomness, in <a href="/how-coin-flipping-works">how coin flipping works</a>.
          </p>
        </article>

        {/* Physical Coin Fairness Tester */}
        <FairnessTester />
      </div>
    </>
  );
};
