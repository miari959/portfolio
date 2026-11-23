

import { CaseStudy, CaseStudySection, caseStudyMetadata } from "@/components/CaseStudy";
import { FlowDiagram } from "@/components/FlowDiagram";

export const metadata = caseStudyMetadata("qutime");

const facts = [
  { label: "Role", value: "Data preparation, machine learning and coordination with the hospital" },
  {
    label: "Project",
    value: "Industry project of Universität Rostock with Rostock University Hospital",
  },
  { label: "When", value: "2023 to 2024" },
  { label: "Built with", value: "Python, scikit-learn, PostgreSQL, Docker, pytest and Metanome" },
  {
    label: "Outcome",
    value: (
      <>
        Became the foundation of the company QuTime: <a href="https://qutime.de">qutime.de</a>
      </>
    ),
  },
];

const pipeline = [
  { text: "Hospital scheduling data" },
  {
    title: "Data profiling and preparation",
    text: "keys, dependencies and errors, with Metanome",
    dark: true,
  },
  { title: "PostgreSQL database", text: "the validated tables" },
  { title: "Machine-learning models", text: "trained and evaluated with scikit-learn", dark: true },
  { title: "Shift plans", text: "generated in the application, with a solver for legal rest periods" },
];

export default function QutimeCaseStudy() {
  return (
    <CaseStudy
      slug="qutime"
      facts={facts}
      intro="I profiled and prepared the scheduling data of Rostock University Hospital and trained machine-learning models for an AI-based system that plans nurses’ and doctors’ shifts around their wishes. I also worked directly with the hospital’s medical staff. In testing, the system fulfilled more than 75% of staff shift wishes."
    >
      <CaseStudySection id="problem" title="The problem">
        <p>
          Rostock University Hospital scheduled its nurses and doctors with a legacy planning
          system. Its medical staff wanted plans that fulfil as many shift wishes as possible while
          meeting legal requirements, such as minimum rest periods between shifts, and provided two
          years of scheduling data for a better system.
        </p>
      </CaseStudySection>

      <CaseStudySection id="built" title="What I built">
        <p>
          I worked on three parts of the project: the data, the machine-learning models and the
          coordination with the hospital. A separate group developed the application and its
          rule-based solver for legal rest periods.
        </p>

        <h3>Data profiling and preparation</h3>
        <p>
          I profiled the hospital’s data export with Metanome, the data-profiling platform from the
          Hasso Plattner Institute. The export contained five tables:
        </p>
        <ul>
          <li>55 employees, 41 nurses and 14 doctors, with their full-time equivalents</li>
          <li>26 shift types with start times, end times and credited hours</li>
          <li>12,729 shift wishes from January 2022 to January 2024</li>
          <li>the staff groups and the public holidays</li>
        </ul>
        <p>I ran 13 of Metanome’s algorithms in 54 runs:</p>
        <ul>
          <li>
            With DUCC, I identified the unique keys, for example one shift wish per employee per
            day.
          </li>
          <li>
            With BINDER, I detected the inclusion dependencies between the tables, the basis for
            the database’s foreign keys.
          </li>
          <li>
            With HyFD, DepMiner and Hydra, I discovered functional dependencies and constraints,
            such as every employee belonging to exactly one staff group.
          </li>
          <li>With Normalize, I derived a schema without redundant columns.</li>
        </ul>
        <p>
          Based on these results, I prepared the tables for the project’s PostgreSQL database,
          which the machine-learning and application groups both worked from.
        </p>

        <h3>Model training</h3>
        <p>
          As part of the machine-learning group, I trained and evaluated models in Python with
          scikit-learn on the data I had prepared. Combined with the application’s rule-based
          solver, the models generated the shift plans.
        </p>
        <FlowDiagram
          steps={pipeline}
          caption="From the hospital’s data to the shift plans. The highlighted steps are my contribution."
        />

        <h3>Coordination with the hospital</h3>
        <p>
          In the coordination group, I met the hospital’s medical staff every two weeks to agree
          on the vision, the goals and the handling of the data, report our progress and take in
          their requests.
        </p>
      </CaseStudySection>

      <CaseStudySection id="hardest" title="The hardest part">
        <p>
          The hardest part was making the data trustworthy. A model learns every error in its
          training data, and the application group would build on the same tables, so I validated
          every table and every relationship between them.
        </p>
        <p>
          My profiling showed that a shift code alone does not identify a shift: the early shift FD
          starts at 06:00 for nurses but at 08:00 for doctors. Only the code and the staff group
          together form a unique key, so a join on the code alone would have mixed up nurses’ and
          doctors’ shifts.
        </p>
        <p>
          It also caught an error in the files I prepared for the database import: an extra row
          with the SQL column types, which Metanome read as data. I spotted it in the column
          statistics: 12,730 records instead of 12,729, with every column typed as text. Once I
          removed the row, dates, numbers and Boolean values were recognised correctly.
        </p>
      </CaseStudySection>

      <CaseStudySection id="result" title="The result">
        <p>
          Tested against the records of the hospital’s legacy system, the generated plans
          fulfilled more than 75% of staff shift wishes.
        </p>
        <p>
          My profiling gave the project a validated data model: the keys of all five tables, the
          relationships between them and the redundant columns to remove. The project became the
          foundation of the company QuTime.
        </p>
      </CaseStudySection>

      <CaseStudySection id="learned" title="What I learned">
        <p>
          The key lesson: validate the data before anyone builds on it. A few hours of profiling
          caught problems that would otherwise surface as wrong predictions or application bugs.
        </p>
        <p>
          Next time, I would turn these checks into automated tests that run on every new data
          export. The extra type row survived in the smallest table, the staff groups, until my
          final run and hid the relationship between groups and staff. An automated test would
          have caught it immediately.
        </p>
        <p>
          I would also validate reference data, such as public holidays, against an official
          source. Profiling only checks data against itself, so it could not detect that the
          holiday list was missing 8 March, a public holiday in Mecklenburg-Vorpommern since 2023.
        </p>
      </CaseStudySection>
    </CaseStudy>
  );
}