import { CaseStudy, CaseStudySection, caseStudyMetadata } from "@/components/CaseStudy";

export const metadata = caseStudyMetadata("landsiedel");

const facts = [
  {
    label: "Role",
    value: "Full-stack developer (internship), the company’s only developer at the time",
  },
  { label: "Company", value: "Landsiedel NLP Training GmbH, Kitzingen, Germany" },
  { label: "When", value: "January to June 2025, full time" },
  {
    label: "Built with",
    value: "PHP, JavaScript, CSS and MySQL, with the Stripe, OpenAI, CleverReach and KlickTipp APIs",
  },
  { label: "Status", value: "Both platforms are live. The AI search is no longer active." },
];

export default function LandsiedelCaseStudy() {
  return (
    <CaseStudy
      slug="landsiedel"
      facts={facts}
      intro={
        <>
          I built and launched two platforms for a German provider of seminars and coaching in
          Neuro-Linguistic Programming: <a href="https://world-of-nlp.org">world-of-nlp.org</a>, a
          magazine in 8 languages, and <a href="https://webinar-tv.de">webinar-tv.de</a>, which took
          the seminar business online. I also proposed and built a Stripe payment system, and built
          an AI search for the seminars.
        </>
      }
    >
      <CaseStudySection id="problem" title="The problem">
        <p>
          Landsiedel’s existing websites were older systems. The company wanted a magazine that
          anyone can read for free, with premium content for paying members, and a way to take its
          seminar business online.
        </p>
      </CaseStudySection>

      <CaseStudySection id="built" title="What I built">
        <p>
          The visual design of both platforms started from a template the company bought; I
          extended it and built all the functionality behind it.
        </p>

        <h3>The magazine: world-of-nlp.org</h3>
        <p>
          I started with the magazine. It went live after two months and was finished by month
          four. Premium content, such as courses, books and private event schedules, is only for
          paying members: the server checks each request before it sends that content.
        </p>

        <h3>The seminar platform: webinar-tv.de</h3>
        <p>
          In the last two months I built webinar-tv.de, with a live programme and a library of
          recorded seminars. It went faster than the magazine because I reused many of its
          components.
        </p>

        <h3>The search</h3>
        <p>
          The library has more than 340 recorded seminars, each 2 to 3 hours long. A seminar’s
          title and description name only a few of the topics discussed in it, so customers could
          miss the seminar they needed. I built a semantic search in 8 languages that finds
          seminars by meaning: it expands the visitor’s query, turns it into an OpenAI embedding and
          compares it with the embeddings of the seminars.
        </p>
        <p>
          My own addition was a topic index: the exact topics discussed in each seminar, stored in
          MySQL and used by the search. The embeddings find seminars by meaning; the topic index
          makes the results more precise.
        </p>

        <h3>Payments</h3>
        <p>
          The payment system handles one-time purchases and subscriptions with Stripe’s own payment
          form, and custom webhooks that I wrote handle payment events on the server.
        </p>

        <h3>Working with the team</h3>
        <p>
          I worked directly with the marketing, editorial, translation and NLP teams. I reported to
          the managing director: he set my tasks each week, we reviewed and tested every change
          together, and he advised me whenever I asked.
        </p>
      </CaseStudySection>

      <CaseStudySection id="hardest" title="The hardest part">
        <p>
          The hardest part was automating the newsletter and the monthly magazine. Until then, the
          managing director chose the recipients of every new issue by hand. He already used two
          German email services, CleverReach and KlickTipp, so my platform had to work with both.
        </p>
        <p>
          Their API documentation covered the basics but not a custom integration like ours, and
          the two services work in very different ways. KlickTipp is built around tags: adding a
          tag to a contact starts a campaign. I used it for the confirmation email after each
          sign-up and for all marketing campaigns. CleverReach is built around lists and mailings,
          and it only made sense once I understood how an account has to be set up, not just its
          API. I used it for the magazine: only the subscribers in the magazine list receive each
          new issue.
        </p>
        <p>
          On top of that, CleverReach’s double opt-in takes more than one API call, and the two
          services sign in differently: CleverReach with OAuth tokens, KlickTipp with a login
          session. Every sign-up also had to land in the right list, by language and by free or
          paying member. People who are already signed up see a message saying so instead of being
          added twice, and the form is protected against bots, so fake sign-ups can’t fill the
          lists.
        </p>
        <p>
          I worked out both services step by step with test contacts. When everything worked, I
          moved the setup to the company’s account and connected it to the real database and
          subscriber lists. From then on, the newsletter, the campaigns and every monthly issue went
          out automatically, without anyone choosing recipients by hand.
        </p>
      </CaseStudySection>

      <CaseStudySection id="result" title="The result">
        <p>Both platforms went live during my internship.</p>
        <p>
          The magazine platform has more than 20,000 registered users, who signed up through the
          company’s magazine campaigns.
        </p>
        <p>
          After the payment system went live, revenue was 19% higher than in the same quarter a
          year earlier. The managing director and I measured this at the end of my internship. We
          compared the same quarter because seminar bookings change with the seasons.
        </p>
        <p>
          The search ran on webinar-tv.de in 2025. The managing director describes it, with the rest
          of my work, in his letter of recommendation.
        </p>
      </CaseStudySection>

      <CaseStudySection id="learned" title="What I learned">
        <p>
          I hadn’t used Stripe before. I learned it in one week from Stripe’s official
          documentation and videos, then built the payment system.
        </p>
        <p>
          Building the magazine first paid off: reusing its components made the seminar platform
          faster to build.
        </p>
        <p>
          Next time, I’d put both email services behind one small layer of my own code from the
          start. The rest of the platform would only talk to that layer, so adding a language or a
          list, or even switching to another email provider, would mean changing one place instead
          of several.
        </p>
      </CaseStudySection>
    </CaseStudy>
  );
}