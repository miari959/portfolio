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
      "Visualizing the Living Architecture of Software Systems – A Tool for Bridging the Gap Between Static Architecture and Dynamic Runtime Behavior",
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
      intro="A tool that records how a Python application really runs and draws it as UML sequence diagrams. A four-stage filter keeps the calls that matter for the architecture and removes the noise."
    >
      <CaseStudySection id="problem" title="The problem">
        <p>
          Architecture diagrams show how a system is meant to work, not how it behaves when it
          runs. A trace of a real run shows that behaviour, but it contains far too many calls to
          read.
        </p>
      </CaseStudySection>

      <CaseStudySection id="built" title="What I built">
        <p>For the thesis I built the two core parts:</p>
        <ul>
          <li>
            A tracer that uses Python’s <code>sys.settrace</code> to record every method call while
            an application handles one user action.
          </li>
          <li>
            A heuristic filter that separates the calls that matter for the architecture from
            execution noise.
          </li>
        </ul>
        <p>The filter works in four stages, one after another:</p>
        <ol>
          <li>
            It removes library and framework code, and small helper functions that many places
            call but that call almost nothing themselves (high fan-in, low fan-out).
          </li>
          <li>It cuts deep technical detail with a depth limit that it computes from each trace.</li>
          <li>
            It keeps only the calls that cross a class or file boundary. This stage had the biggest
            effect.
          </li>
          <li>It labels each remaining call with the architectural layer it belongs to.</li>
        </ol>
        <p>
          After the thesis I added a web interface: a FastAPI backend and a React and Vite
          frontend, where you switch each filter stage on and off and watch the sequence diagram
          change. The tracing and filtering code from the thesis stayed unchanged. A multi-stage
          Docker build packages all of it.
        </p>
        <FlowDiagram
          steps={pipeline}
          caption="From a running application to a sequence diagram. The dark box is the filter that decides which calls to keep."
        />
      </CaseStudySection>

      <CaseStudySection id="hardest" title="The hardest part">
        <p>
          Python’s <code>sys.settrace</code> is process-global: it applies to the whole Python
          process, so two traces running at the same time would interfere with each other. I added
          an in-process lock, so only one trace runs at a time.
        </p>
      </CaseStudySection>

      <CaseStudySection id="result" title="The result">
        <p>
          I ran the tool on 8 Python applications and measured the filter in detail on three of
          them: a small console application, a Django application and Home Assistant. First I
          labelled every recorded event by hand as either architecturally significant or noise.
          Then I scored each filter stage against those labels.
        </p>
        <p>
          On all three applications, the filter cut the recorded data by 87 to 98% without
          removing a single significant interaction.
        </p>
        <p>The evaluation has limits:</p>
        <ul>
          <li>The Django result comes from a sample of 500 of its more than 40,000 recorded events.</li>
          <li>The fourth stage, which labels the layers, wasn’t scored the same way as the others.</li>
          <li>There was no study with real users.</li>
          <li>
            In deep frameworks such as Flask and Django, the depth limit also removes some of the
            application’s own code.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="learned" title="What I learned">
        <p>
          Next time, I’d count the call depth only across the application’s own code and skip the
          framework’s layers. In deep frameworks like Flask and Django, that would keep the
          application calls that the depth limit removes today.
        </p>
      </CaseStudySection>
    </CaseStudy>
  );
}