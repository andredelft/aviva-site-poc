import { Card } from "./components/card/Card";
import "./index.scss";
import "./curtains";

function App() {
  return (
    <>
      <div id="curtain"></div>
      <div className="page">
        <h1>Digitale oplossingen die meegroeien.</h1>
        <Card.Row>
          <Card
            title="Experience & Design"
            description="We werken samen met jouw IT-organisatie om de teams, architecture en platformen te bouwen die je digitale business vooruit brengen. "
            ctaLabel="Ontdek meer"
            href="#"
          />
          <Card
            title="Development & Engineering"
            description="We werken samen met jouw IT-organisatie om de teams, architecture en platformen te bouwen die je digitale business vooruit brengen. "
            ctaLabel="Ontdek meer"
            href="#"
          />
          <Card
            title="Growth & Marketing"
            description="We werken samen met jouw IT-organisatie om de teams, architecture en platformen te bouwen die je digitale business vooruit brengen. "
            ctaLabel="Ontdek meer"
            href="#"
          />
        </Card.Row>
        <Card.Row>
          <Card
            title="Inhouse & Professionalisering"
            description="We werken samen met jouw IT-organisatie om de teams, architecture en platformen te bouwen die je digitale business vooruit brengen. "
            ctaLabel="Ontdek meer"
            href="#"
          />
          <Card
            title="Experience & Design"
            description="We werken samen met jouw IT-organisatie om de teams, architecture en platformen te bouwen die je digitale business vooruit brengen. "
            ctaLabel="Ontdek meer"
            href="#"
          />
        </Card.Row>
      </div>
    </>
  );
}

export default App;
