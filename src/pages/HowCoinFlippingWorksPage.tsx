import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/Button';

export const HowCoinFlippingWorksPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/how-coin-flipping-works" />
    <PageHeader
      title="How coin flipping works"
      intro="We think of a coin toss as pure chance. It’s actually physics, and a real coin is very slightly unfair. Here’s what’s going on, and how an online flip compares."
    />

    <article className="prose-page">
      <h2>A real coin toss is physics, not magic</h2>
      <p>
        Once a coin leaves your thumb, where it lands is decided by how hard you flicked it, how fast it’s
        spinning, how high it goes and how it bounces. If you could measure all of that perfectly, you could
        predict the result. Nobody can, which is why it feels random.
      </p>
      <p>
        Mathematician Persi Diaconis and his colleagues built a coin-flipping machine to prove the point. With
        the exact same launch every time, the machine got the same side every time.
      </p>

      <h2>Real coins lean slightly towards their starting side</h2>
      <p>
        Most human flips aren’t perfectly clean: the coin wobbles as it spins. Diaconis’s research predicted
        that this makes a coin slightly more likely to land the same way up as it started, about 51% of the
        time. In 2023 a group of researchers tested this by flipping coins over 350,000 times, and found almost
        exactly that: 50.8% landed on the side they started on.
      </p>
      <p>
        So if you start with heads facing up, you’re ever so slightly more likely to get heads. It’s far too
        small to notice in everyday life, but it’s real.
      </p>

      <h2>And sometimes they land on the edge</h2>
      <p>
        It’s rare, but it happens. Researchers estimated that a US nickel lands on its edge about once in
        6,000 tosses. Thicker coins do it more often.
      </p>

      <h2>How an online coin flip works</h2>
      <p>
        A website can’t throw a real coin, so it asks the computer for a random number instead. Tossio uses
        your browser’s cryptographic random number generator, the same kind of randomness used to create
        secure passwords and encryption keys. It takes one random bit: 0 means heads, 1 means tails.
      </p>
      <p>
        That has a few nice side effects compared with a real coin:
      </p>
      <ul>
        <li>There’s no starting-side bias and no wobble, so both sides are exactly as likely.</li>
        <li>The coin never lands on its edge or rolls under the sofa.</li>
        <li>Nothing about your previous flips, the time of day or your device changes the odds.</li>
      </ul>
      <p>
        The spinning coin you see is just an animation. The result is decided the moment you press the button.
      </p>

      <h2>Can you tell it’s fair?</h2>
      <p>
        Over a handful of flips, no. Ten flips could easily come out 7 to 3. But over thousands of flips, a fair
        coin settles close to 50%. Try it in the <Link to="/coin-flip-experiment">simulator</Link>, or read
        about why in <Link to="/coin-flip-probability">coin flip probability</Link>.
      </p>
    </article>

    <div className="mt-10 flex flex-wrap gap-3">
      <ButtonLink to="/">Flip a coin</ButtonLink>
      <ButtonLink to="/coin-flip-experiment" variant="secondary">
        Run 10,000 flips
      </ButtonLink>
    </div>
  </div>
);
