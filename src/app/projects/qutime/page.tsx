import { CaseStudy, CaseStudySection, caseStudyMetadata } from "@/components/CaseStudy";
import { FlowDiagram } from "@/components/FlowDiagram";

export const metadata = caseStudyMetadata("qutime");

const facts = [
  {
    label: "Role",
    value: "Data profiling and preparation, machine learning and coordination with the hospital",
  },
  {
    label: "Project",
    value: "Industry project of Universität Rostock with Rostock University Hospital",
  },
  { label: "Client", value: "QuTime" },
  { label: "When", value: "2023 to 2024" },
  { label: "Built with", value: "Python, scikit-learn, PostgreSQL, Docker, pytest and Metanome" },
];

const pipeline = [
  { text: "Hospital scheduling data" },
  {
    title: "Data profiling and preparation",
    text: "keys, dependencies and errors, with Metanome",
    dark: true,
  },
  { title: "PostgreSQL database", text: "the validated tables" },
  { title: "Forecasting models", text: "trained and evaluated with scikit-learn", dark: true },
  { title: "Shift plans", text: "forecasts combined with a rule-based constraint solver" },
];

export default function QutimeCaseStudy() {
  return (
    <CaseStudy
      slug="qutime"
      facts={facts}
      intro="I profiled and prepared two years of scheduling data from Rostock University Hospital, trained forecasting models for an AI-based shift-planning system and worked directly with the hospital’s medical staff throughout the project. The system anticipates upcoming staffing needs and combines machine learning with rule-based constraint satisfaction, so that plans keep the wards adequately staffed, respect legal rest periods and accept as many staff wishes as possible. In testing, it fulfilled more than 75% of staff shift wishes."
    >
      <CaseStudySection id="problem" title="The problem">
        <p>
          Rostock University Hospital planned the shifts of its nurses and doctors with a
          conventional scheduling system. Systems like this react rather than anticipate: a
          staffing gap becomes visible only once the plan is already running, and closing it
          usually means overriding staff wishes. The result is short-staffed shifts, rejected
          wishes and disruption on the wards.
        </p>
        <p>
          The goal was a system that looks ahead and balances the needs of the hospital and its
          staff: enough staff on every shift, legal rest periods between shifts and as many
          accepted wishes as possible. The company QuTime commissioned the project, and the
          hospital’s medical staff provided the real scheduling data to build it.
        </p>
      </CaseStudySection>

      <CaseStudySection id="built" title="What I built">
        <p>
          My work covered three areas: the data that every part of the system relied on, the
          forecasting models, and the coordination with the hospital’s medical staff. A separate
          group developed the application, including its rule-based constraint solver.
        </p>

        <h3>Data profiling and preparation</h3>
        <p>
          I profiled the hospital’s data export with Metanome, the data-profiling platform from the
          Hasso Plattner Institute, to establish its structure and quality. The export contained
          five tables:
        </p>
        <ul>
          <li>
            55 employees (41 nurses and 14 doctors), each with a full-time equivalent between 0.13
            and 1.0
          </li>
          <li>
            26 shift and absence types, from early, late and night shifts to 24-hour weekend
            on-call duty, vacation and training days, each with its start time, end time and
            credited hours
          </li>
          <li>
            12,729 shift wishes from January 2022 to January 2024, 346 of them marked as important
          </li>
          <li>
            the two staff groups with their daily working hours, and 110 public holidays from 2020
            to 2030
          </li>
        </ul>
        <p>I ran 13 of Metanome’s algorithms in 54 runs to derive the data model:</p>
        <ul>
          <li>
            With DUCC, I identified the unique keys: date and employee together identify each shift
            wish, because an employee has at most one wish per day.
          </li>
          <li>
            With BINDER, I detected the inclusion dependencies between the tables, for example that
            every employee in the wishes exists in the employee table. These are the basis for the
            database’s foreign keys.
          </li>
          <li>
            With HyFD, DepMiner and Hydra, I discovered the functional dependencies and constraints
            that hold across the data, such as every employee belonging to exactly one staff group
            and every shift type determining whether it counts as on-call duty.
          </li>
          <li>
            With Normalize, I derived a normalised schema without redundant columns. In it, the
            wishes table no longer repeats each employee’s group, which the employee table already
            holds.
          </li>
        </ul>
        <p>
          Based on these results, I prepared the tables of the project’s PostgreSQL database, the
          shared foundation for the forecasting models and the application.
        </p>

        <h3>Forecasting models</h3>
        <p>
          As part of the machine-learning group, I trained and evaluated models in Python with
          scikit-learn on the data I had prepared. Their job was to look ahead: to anticipate where
          staff would run short, so that plans could prevent understaffing instead of reacting to
          it, while still accepting as many wishes as possible. The application combined their
          predictions with a rule-based constraint solver, which ensured that every plan met the
          hard rules, such as legal rest periods.
        </p>
        <FlowDiagram
          steps={pipeline}
          caption="From the hospital’s data to the shift plans. The highlighted steps are my contribution."
        />

        <h3>Coordination with the hospital</h3>
        <p>
          In the coordination group, I met the hospital’s medical staff every two weeks. Together
          we agreed on the vision and the goals, decided how the data should be handled, reviewed
          our progress and captured their requests for the team.
        </p>
      </CaseStudySection>

      <CaseStudySection id="hardest" title="The hardest part">
        <p>
          The hardest part was making the hospital’s data trustworthy enough to learn from. A model
          learns every error in its training data, and the application was built on the same
          tables, so I validated every table and every relationship between them.
        </p>
        <p>
          My profiling revealed that a shift code alone does not identify a shift: the early shift
          (code FD) starts at 06:00 for nurses but at 08:00 for doctors. Only the code and the
          staff group together form a unique key. A join on the code alone would have silently
          mixed nurses’ and doctors’ shifts and distorted the training data.
        </p>
        <p>
          It also exposed an error in the files I had prepared for the database import: an extra
          row holding the SQL column types, which Metanome read as data. The column statistics gave
          it away: 12,730 records instead of 12,729, with every column typed as text. After I
          removed the row, dates, numbers and Boolean values were recognised correctly.
        </p>
      </CaseStudySection>

      <CaseStudySection id="result" title="The result">
        <p>
          Tested against the records of the hospital’s legacy system, the generated plans fulfilled
          more than 75% of staff shift wishes.
        </p>
        <p>
          My profiling gave the project a validated data model: the keys of all five tables, the
          relationships between them and a schema free of redundant columns. Both the forecasting
          models and the application were built on it.
        </p>
      </CaseStudySection>

      <CaseStudySection id="learned" title="What I learned">
        <p>
          The key lesson: validate the data before anyone builds on it. A few hours of systematic
          profiling caught problems that would otherwise have surfaced as wrong predictions or
          application bugs, which are far harder to trace back to their source.
        </p>
        <p>
          Next time, I would turn these checks into automated tests that run on every new data
          export. The extra type row survived in the smallest table, the staff groups, until my
          final run and hid the relationship between groups and staff. An automated test would
          have caught it immediately.
        </p>
        <p>
          I would also validate reference data against an official source. Profiling only checks
          data against itself, so it could not detect that the holiday list was missing 8 March, a
          public holiday in Mecklenburg-Vorpommern since 2023.
        </p>
      </CaseStudySection>
    </CaseStudy>
  );
}