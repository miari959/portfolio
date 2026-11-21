import { CaseStudy, CaseStudySection, caseStudyMetadata } from "@/components/CaseStudy";
import { FlowDiagram } from "@/components/FlowDiagram";

export const metadata = caseStudyMetadata("living-architecture");

const facts = [
  { label: "Role", value: "My bachelor thesis" },
  { label: "University", value: "Universität Rostock, Germany" },
  { label: "When", value: "Mid-2025 to March 2026" },
  { label: "Built with", value: "Python, FastAPI, React, Vite and Docker" },
  {
    label: "Code",
    value: (
      <a href="https://github.com/miari959/living-architecture">
        github.com/miari959/living-architecture
      </a>
    ),
  },
  {
    label: "Thesis title",
    value:
      "Visualization of the “Living Architecture” of software systems – A tool for bridging the gap between static architecture and dynamic behavior",
  },
];

const pipeline = [
  { text: "A running Python application" },
  {
    title: "Tracer",
    text: (
      <>
        <code>sys.settrace</code> records method calls
      </>
    ),
  },
  { text: "Raw call trace" },
  { title: "Four-stage filter", text: "framework code, call depth, boundaries, layers", dark: true },
  { title: "UML sequence diagram", text: "React interface, FastAPI backend" },
];

export default function LivingArchitectureCaseStudy() {
  return (
    <CaseStudy
      slug="living-architecture"
      facts={facts}
      intro="A tool that records how a Python application really runs and draws it as UML sequence diagrams. A four-stage filter keeps the calls that matter for the architecture and removes the noise: in my evaluation, 87.5 to 98.4% of the recorded events, without losing a single architectural interaction."
    >
      <CaseStudySection id="problem" title="The problem">
        <p>
          Architecture diagrams show how a system is meant to work, not how it behaves when it
          runs. A trace of a real run shows that behaviour, but it contains far too many calls to
          read.
        </p>
      </CaseStudySection>

      <CaseStudySection id="built" title="What I built">
        <p>
          For the thesis I built a pipeline with three parts. I chose Python because most earlier
          research targeted Java and C++, and because Python’s built-in <code>sys.settrace</code>{" "}
          can record a running application without changing its code.
        </p>
        <ul>
          <li>
            A tracer that records every method call while the application handles one user action:
            the caller and the callee, their classes and files, and how deep the call sits in the
            stack.
          </li>
          <li>
            A filter that separates the calls that matter for the architecture from execution noise.
          </li>
          <li>A visualizer that turns the filtered trace into a PlantUML sequence diagram.</li>
        </ul>
        <p>The filter works in four stages, one after another:</p>
        <ol>
          <li>
            It removes the standard library and installed packages, such as Django, by their file
            paths. Then it removes helper methods that many places call but that call almost nothing
            themselves, such as a logger: a fan-in of 3 or more and a fan-out of 2 or less.
          </li>
          <li>
            It cuts deep technical detail with a depth limit that it computes for each trace from
            how the calls spread across depths. Home Assistant’s deep asynchronous code needed a
            limit of 11 levels, while the small console application kept all of its levels.
          </li>
          <li>
            It keeps only the calls that cross a class or file boundary. This stage is the thesis’s
            main new idea: the two closest earlier approaches, by Hamou-Lhadj and Lethbridge and by
            Cornelissen, Moonen and Zaidman, have no equivalent rule. It removes shallow calls
            inside a class, such as a sort function calling itself, that the other stages miss, and
            it made the biggest difference to how clear the diagrams are.
          </li>
          <li>
            It labels each remaining class with its architectural layer: presentation, logic or
            data.
          </li>
        </ol>
        <p>
          Earlier work offered techniques like these separately, as options for the user to pick.
          My filter applies them automatically, in a fixed order, with the same thresholds for every
          application.
        </p>
        <p>
          After the thesis I refined the tool and published it on GitHub with a web interface: a
          FastAPI backend and a React and Vite frontend that draws the diagrams with Mermaid. You
          pick one of eight target applications, switch each filter stage on and off and watch the
          diagram change. The tracing and filtering code from the thesis stayed unchanged. A
          multi-stage Docker build packages everything into one image.
        </p>
        <FlowDiagram
          steps={pipeline}
          frame="Runs in one Docker container"
          caption="From a running application to a sequence diagram. The dark box is the filter that decides which calls to keep."
        />
      </CaseStudySection>

      <CaseStudySection id="hardest" title="The hardest part">
        <p>Two problems were the hardest, one in each phase.</p>
        <p>
          In the thesis, it was proving that the filter never removes anything important. A high
          reduction proves nothing on its own: a filter that deletes everything would remove 100%.
          So I treated the filter as a classifier. Before looking at its decisions, I labelled every
          recorded event myself, from the source code, as an architectural interaction or noise, and
          then scored each stage against those labels. Home Assistant’s 951 events run through
          asynchronous coroutines, component registries and plugins, so I wrote an evaluation
          script that logged each event’s method, file, class, depth and stage, and then reviewed
          every row by hand. That took about two weeks.
        </p>
        <p>
          In the web version, it was running traces safely. Python’s <code>sys.settrace</code> is
          process-global, so two traces running at the same time would interfere with each other,
          and the code that starts some target applications also changes global state, such as
          Django’s setup. The backend therefore runs one trace at a time behind an in-process lock,
          and the Docker container runs a single worker process, because a second process would
          have its own lock.
        </p>
      </CaseStudySection>

      <CaseStudySection id="result" title="The result">
        <p>
          I evaluated the filter on three applications with very different architectures, using the
          same thresholds for all of them:
        </p>
        <ul>
          <li>A small procedural console application: 72 events down to 9, 87.5% less.</li>
          <li>A Django web application: 500 events down to 8, 98.4% less.</li>
          <li>Home Assistant, which is event-driven and asynchronous: 951 events down to 84, 91.2% less.</li>
        </ul>
        <p>
          In all three, the filter didn’t remove a single architectural interaction and left no
          noise behind: precision and recall were 100%. I also ran it on Zulip, a chat server with
          more than 400,000 raw events, but checked that result only at the structural level.
        </p>
        <p>The evaluation has limits:</p>
        <ul>
          <li>
            I labelled the events alone, so another person might judge some edge cases, such as
            constructor calls, differently.
          </li>
          <li>
            Django’s trace was capped at 500 events, because each of its ten scenarios produced more
            than 40,000.
          </li>
          <li>
            The fourth stage, which labels layers, wasn’t scored the same way, because its labels
            depend more on judgement.
          </li>
          <li>
            There was no study with real users, so the results show that the filter classifies
            events correctly, not yet that developers understand a system faster with it.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="learned" title="What I learned">
        <p>
          The biggest lesson was turning research into working code. I went through more than 150
          papers on runtime analysis and trace reduction and kept the 33 that were relevant, which
          the thesis cites. Then I built the filter one stage at a time on six applications. Each one showed a kind of noise the current stages couldn’t handle,
          and I added the technique from the literature that removed it: first library calls, then
          helpers like loggers, then Django’s deep framework chains, and finally calls from a class
          to itself.
        </p>
        <p>
          Testing also showed me what to avoid. Standard repetition removal was too aggressive and
          deleted valid calls, so stage 3 checks boundaries instead. And no fixed depth limit fits
          both a small application and a large framework, so stage 2 computes its limit for each
          trace.
        </p>
        <p>
          One weakness showed up after the thesis: when I ran full Flask and Django traces in the
          web interface, the depth limit also removed some of the applications’ own code, because it
          sits far below the framework’s request handling. Next time, I’d count the depth only
          across the application’s own calls and skip the framework’s layers.
        </p>
      </CaseStudySection>
    </CaseStudy>
  );
}